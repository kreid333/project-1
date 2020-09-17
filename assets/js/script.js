$(function() {

    $("#search-btn").on("click", function(event) {
        event.preventDefault();
        showRecipe();
        showRestaurant();
    })

    function showRecipe() {
        var queryURLRecipe = "https://api.spoonacular.com/recipes/complexSearch?apiKey=d966ad9d26074fb7a91baf2b851421b0&query=" + $("#food-search").val() + "&addRecipeInformation=true";
        $.ajax({
            url: queryURLRecipe,
            method: "GET",
        }).then(function(response) {
            $("#recipe-card").empty()
            var recipeImage = $("<img>")
            recipeImage.attr("src", response.results[0].image)
            recipeImage.attr("class", "recipe-height")
            var recipeTitle = $("<p>")
            recipeTitle.text(response.results[0].title)
            var recipeLink = $("<a>")
            recipeLink.attr("href", response.results[0].sourceUrl)
            recipeLink.text(response.results[0].sourceUrl)
            $("#recipe-card").append(recipeImage, recipeTitle, recipeLink)
            console.log(response);
        })
    }


    function success(pos) {
        var latitudeCrd = pos.coords.latitude;
        var longitudeCrd = pos.coords.longitude;
        localStorage.setItem("latitude", latitudeCrd);
        localStorage.setItem("longitude", longitudeCrd);
    }
    navigator.geolocation.getCurrentPosition(success);
    var service;
    var infowindow;

    function initialize() {
        var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
        });
        var request = {
            location: pyrmont,
            radius: '500',
            type: ['restaurant']
        };
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }
    initialize();


});