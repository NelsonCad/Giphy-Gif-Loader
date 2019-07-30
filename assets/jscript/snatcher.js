$(document).ready(function () {

    // initial buttons to search giphy with
    let gifSearch = ["kittens", "dogs", "reptiles", "mindblown"];

    function gifSpoils() {

        let giffies = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giffies + "&limit=10&api_key=wE8oaJRI5jNX3LiL6hncr8yOGzHbHJLz";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            let results = response.data;

            for (i = 0; i < results.length; i++) {
                
                let goods = $("<div>");

                let gifImage = $("<img>");

                let gifURL = results[i].images.original.url;

                let gifRating = results[i].rating;

                gifImage.attr("src", gifURL);
                gifImage.attr("alt", "generated gif");
                
                goods.append(gifImage);
                goods.prepend(gifRating);




                $("#gif-view").prepend(goods);
            };

        });

    }

    function buttonGen() {

        $("#gifBtns").empty();

        gifSearch.forEach(function (search) {

            let searchBtn = $("<button>");
            searchBtn.addClass("search");
            searchBtn.text(search)
            searchBtn.attr("data-name", search);

            $("#gifBtns").append(searchBtn);
        });

    }

    $("#addGif").on("click", function (event) {

        event.preventDefault();

        let request = $("#gifRequest").val().trim();

        if (!gifSearch.includes(request)) {
            gifSearch.push(request);
        };

        buttonGen();
    });
    buttonGen();

    $(document).on("click", ".search", gifSpoils);


});