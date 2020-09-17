$(function() {

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        showRecipe();
    })

    function showRecipe () {
        var queryURLRecipe = "";
        $.ajax({
            url: queryURLRecipe,
            method: "GET",
        }).then(function (response) {
        })
    }
})