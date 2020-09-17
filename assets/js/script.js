$(function() {

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        showRecipe();
        
    })

    function showRecipe() {
        var queryURLRecipe = "";
// api key = d966ad9d26074fb7a91baf2b851421b0
        $.ajax({
            url: queryURLRecipe,
            method: "GET",
        }).then(function (response) {
    
        })
    }









})