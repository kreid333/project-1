$(document).ready(function() {
    function success(pos) {
        var latitudeCrd = pos.coords.latitude;
        var longitudeCrd = pos.coords.longitude;
        localStorage.setItem("latitude", latitudeCrd);
        localStorage.setItem("longitude", longitudeCrd);
    }
    navigator.geolocation.getCurrentPosition(success);
    $("#search-btn").on("click", function(event) {
        event.preventDefault();
        showRecipe();
        showRestaurant();
    });

    function showRecipe() {
        var queryURLRecipe =
            "https://api.spoonacular.com/recipes/complexSearch?apiKey=ef7ed7d640d243c4be484650917627e8&query=" +
            $("#food-search").val() +
            "&addRecipeInformation=true";
        $.ajax({
            url: queryURLRecipe,
            method: "GET",
        }).then(function(response) {
            console.log(response)
            var randomIndex = Math.floor(Math.random() * (response.results.length))
            console.log(randomIndex)
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
        var settings = {
            async: true,
            crossDomain: true,
            url: "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=30&lunit=mi&lang=en_US&latitude=" +
                localStorage.getItem("latitude") +
                "&longitude=" +
                localStorage.getItem("longitude"),
            method: "GET",
            headers: {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": "eb45bf77dfmshf915d7ada5b551ep155d70jsn029abbe4cef7",
            },
        };
        $.ajax(settings).done(function(response) {
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
            console.log(array);
            var randomIndex = Math.floor(Math.random() * array.length);
            $("#restaurant-name").empty();
            $("#restaurant-location").empty();
            $("#restaurant-photo").empty();
            $("#restaurant-rating").empty();
            $("#restaurant-price").empty();
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
              $("#restaurant-rank").text(
                "Restaurant Rating: " + array[randomIndex].rating * 10 + "/50"
              );
              var restaurantPrice = $("<p>");
              restaurantPrice.text(array[randomIndex].price_level);
              $("#restaurant-price").append(restaurantPrice);
            }
        });
    }
});