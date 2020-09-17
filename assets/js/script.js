$(function() {

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        showRecipe();
    })

    function showRecipe () {
        var queryURLRecipe = "https://api.spoonacular.com/recipes/complexSearch?apiKey=d966ad9d26074fb7a91baf2b851421b0&query=" + $("#food-search").val();
        $.ajax({
            url: queryURLRecipe,
            method: "GET",
        }).then(function (response) {
            console.log(response);
        })
    }
})