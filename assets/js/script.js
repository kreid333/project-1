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

    });

    function showRecipe() {
        var queryURLRecipe =
            "https://api.spoonacular.com/recipes/complexSearch?apiKey=d966ad9d26074fb7a91baf2b851421b0&query=" +
            $("#food-search").val() +
            "&addRecipeInformation=true";
        $.ajax({
            url: queryURLRecipe,
            method: "GET",
        }).then(function(response) {
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
            console.log(response);
        });
    }
});



// name,location string,rating,price level,photo,website

// name, location string, photo, rating, price

//var restaurantPhoto = $("<img>");
//restaurantPhoto.attr("src", response.data[0].photo.images.small.url);
//$("#restaurant-photo").append(restaurantPhoto);

//$("#restaurant-info").empty()