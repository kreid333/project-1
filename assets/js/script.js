$(document).ready(function () {
  function success(pos) {
    var latitudeCrd = pos.coords.latitude;
    var longitudeCrd = pos.coords.longitude;
    localStorage.setItem("latitude", latitudeCrd);
    localStorage.setItem("longitude", longitudeCrd);
  }
  navigator.geolocation.getCurrentPosition(success);
    function setTime() {
    setInterval(function() {
      $("#search-btn").attr("disabled", false);
    }, 5000);
  }
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    $("#search-btn").attr("disabled", true);
    setTime();
    showRecipe();
    showRestaurant();
    document.querySelector("#receipeCard").style.display = "block";
    document.querySelector("#restaurantCard").style.display = "block";
  });

  $("#clear-btn").on("click", function () {
    $("#recipe-image").empty();
    $("#recipe-title").empty();
    $("#recipe-time").empty();
    $("#recipe-ranking").empty();
    $("#recipe-link").empty();
    $("#restaurant-name").empty();
    $("#restaurant-location").empty();
    $("#restaurant-photo").empty();
    $("#restaurant-address").empty();
    $("#restaurant-rating").empty();
    $("#restaurant-price").empty();
    $("#restaurant-rank").empty();
    $("#recipe-rank").empty();
    document.querySelector("#receipeCard").style.display = "none";
    document.querySelector("#restaurantCard").style.display = "none";
    
  });

  function showRecipe() {
    var queryURLRecipe =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=4783ed6fa8ed48f79ed0bce7a461f32f&query=" +
      $("#food-search").val() +
      "&addRecipeInformation=true";
    $.ajax({
      url: queryURLRecipe,
      method: "GET",
    }).then(function (response) {
      var randomIndex = Math.floor(Math.random() * response.results.length);
      $("#recipe-image").empty();
      $("#recipe-title").empty();
      $("#recipe-time").empty();
      $("#recipe-ranking").empty();
      $("#recipe-link").empty();
      if (response.results[randomIndex].image !== undefined) {
        var recipeImage = $("<img>");
        recipeImage.attr("src", response.results[randomIndex].image);
        recipeImage.attr("class", "recipe-height");
        $("#recipe-image").append(recipeImage);
      }
      var recipeTitle = $("<p>");
      recipeTitle.text(response.results[randomIndex].title);
      $("#recipe-title").append(recipeTitle);
      var recipeTime = $("<p>");
      recipeTime.text(
        "Time to make: " +
          response.results[randomIndex].readyInMinutes +
          " minutes"
      );
      $("#recipe-time").append(recipeTime);
      $("#recipe-rank").text(
        "Recipe Rating: " +
          response.results[randomIndex].spoonacularScore / 2 +
          "/50"
      );
      var recipeLink = $("<a>");
      recipeLink.attr("href", response.results[randomIndex].sourceUrl);
      recipeLink.text(response.results[randomIndex].sourceUrl);
      $("#recipe-link").append(recipeLink);
    });
  }

  function showRestaurant() {
    var cousineType = $("#food-search").val();
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=30&lunit=mi&lang=en_US&latitude=" +
        localStorage.getItem("latitude") +
        "&longitude=" +
        localStorage.getItem("longitude"),
      method: "GET",
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "722ef8863bmsha41e0b318e67cb6p142842jsn4e762831a71e",
      },
    };
    $.ajax(settings).done(function (response) {
      var array = [];
      var data = response.data;
      for (var i = 0; i < data.length; i++) {
        if (data[i].cuisine !== [] && data[i].cuisine !== undefined) {
          for (var j = 0; j < data[i].cuisine.length; j++) {
            if (data[i].cuisine[j].name.includes(cousineType)) {
              array.push(data[i]);
            }
          }
        }
      }
      var randomIndex = Math.floor(Math.random() * array.length);
      $("#restaurant-name").empty();
      $("#restaurant-location").empty();
      $("#restaurant-photo").empty();
      $("#restaurant-address").empty();
      $("#restaurant-rating").empty();
      $("#restaurant-price").empty();
      if (array.length === 0) {
        $("#restaurant-rank").empty();
        var errorMsg = $("<h2>");
        errorMsg.text(
          "We could not find any restaurant with " + cousineType + " cuisine."
        );
        $("#restaurant-name").append(errorMsg);
      } else {
        if (array[randomIndex].name !== undefined) {
          var restaurantName = $("<p>");
          restaurantName.text(array[randomIndex].name);
          $("#restaurant-name").append(restaurantName);
          var restaurantLocation = $("<p>");
          restaurantLocation.text(array[randomIndex].location_string);
          $("#restaurant-location").append(restaurantLocation);
          if (array[randomIndex].photo) {
            var restaurantPhoto = $("<img>");
            restaurantPhoto.attr(
              "src",
              array[randomIndex].photo.images.small.url
            );
            $("#restaurant-photo").append(restaurantPhoto);
          }
          var restaurantAddress = $("<p>");
          restaurantAddress.text(array[randomIndex].address);
          $("#restaurant-address").append(restaurantAddress);
          $("#restaurant-rank").text(
            "Restaurant Rating: " + array[randomIndex].rating * 10 + "/50"
          );
          var restaurantPrice = $("<p>");
          restaurantPrice.text(array[randomIndex].price_level);
          $("#restaurant-price").append(restaurantPrice);
        }
      }
    });
  }
});
