$(document).ready(function () {
    function success(pos) {
      var latitudeCrd = pos.coords.latitude;
      var longitudeCrd = pos.coords.longitude;
      localStorage.setItem("latitude", latitudeCrd);
      localStorage.setItem("longitude", longitudeCrd);
    }
    navigator.geolocation.getCurrentPosition(success);
  
    $("#search-btn").on("click", function (event) {
      event.preventDefault();
      showRecipe();
      showRestaurant();
    });
  
    function showRecipe() {
      var queryURLRecipe =
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=7f3f9ece5a96497bb92170a04e3ce52d&query=" +
        $("#food-search").val() +
        "&addRecipeInformation=true";
      $.ajax({
        url: queryURLRecipe,
        method: "GET",
      }).then(function (response) {
        $("#recipe-card").empty();
        var recipeImage = $("<img>");
        recipeImage.attr("src", response.results[0].image);
        recipeImage.attr("class", "recipe-height");
        var recipeTitle = $("<p>");
        recipeTitle.text(response.results[0].title);
        var recipeLink = $("<a>");
        recipeLink.attr("href", response.results[0].sourceUrl);
        recipeLink.text(response.results[0].sourceUrl);
        $("#recipe-card").append(recipeImage, recipeTitle, recipeLink);
      });
    }
  
    function showRestaurant() {
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
          "x-rapidapi-key": "cdf4a28da3msh2714d9190d1a135p186e99jsnd3a3d0565df5",
        },
      };
  
      $.ajax(settings).done(function (response) {
        var array = [];
        var data = response.data;
        for (var i = 0; i < data.length; i++) {
          if (
            data[i].cuisine !== [] &&
            data[i].cuisine !== undefined &&
            data[i].cuisine[0] !== undefined &&
            data[i].cuisine[0].name.includes($("#food-search").val())
          ) {
            array.push(data[i]);
          }
        }
        $("#restaurant-name").empty();
        $("#restaurant-location").empty();
        $("#restaurant-photo").empty();
        $("#restaurant-rating").empty();
        $("#restaurant-price").empty();
  
        var restaurantName = $("<p>");
        restaurantName.text(array[0].name);
        $("#restaurant-name").append(restaurantName);
  
        var restaurantLocation = $("<p>");
        restaurantLocation.text(array[0].location_string);
        $("#restaurant-location").append(restaurantLocation);
  
        // if (array[0].photo.images.small.url) {
        //   var restaurantPhoto = $("<img>");
        //   restaurantPhoto.attr("src", array[0].photo.images.small.url);
        //   $("#restaurant-photo").append(restaurantPhoto);
        // }
  
        var restaurantRating = $("<p>");
        restaurantRating.text(array[0].rating);
        $("#restaurant-rating").append(restaurantRating);
  
        var restaurantPrice = $("<p>");
        restaurantPrice.text(array[0].price_level);
        $("#restaurant-price").append(restaurantPrice);
      });
    }
  });