$(document).ready(function () {

    // initial buttons to search giphy with
    let gifSearch = ["Homestuck", "My Hero Academia", "Dragon Ball Super", "Science", "Robotics"];

    function gifSpoils() {

        let giffies = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giffies + "&limit=15&rating=pg&api_key=wE8oaJRI5jNX3LiL6hncr8yOGzHbHJLz";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            let results = response.data;

            for (i = 0; i < results.length; i++) {
                // loads the various base components 
                let goods = $("<div>");
                let gifImage = $("<img>");
                let gifRating = "this gif is rated " + results[i].rating;

                // adds still and animated versions of the gif
                let gifURL = results[i].images.original.url;
                let gifStill = results[i].images.original_still.url;

                // adds the attributes for the gif for later use in function
                gifImage.attr("src", gifStill);
                gifImage.attr("data-animated", gifURL);
                gifImage.attr("data-still", gifStill);
                gifImage.addClass("giphy");
                gifImage.attr("alt", "generated gif");

                // append the image/rating for the user
                goods.append(gifRating);
                goods.append("<br>");
                goods.append(gifImage);


                $("#gif-view").prepend(goods);
            };

        });

    }

    // generate buttons for user use
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

    // upon clicking add-gif-search button
    $("#addGif").on("click", function (event) {
        // page refresh DENIED
        event.preventDefault();

        let request = $("#gifRequest").val().trim();
        // if the item being added isn't already on the list of searches
        if (!gifSearch.includes(request)) {
            gifSearch.push(request);
        };
        //attempt to empty the text box
        $("#gifRequest").text(" ");

        //generate buttons again
        buttonGen();

    });

    function gifPause() {
        // if the image is already still
        if (($(this).attr("src")) === ($(this).data("still"))) {
            // animate the image
            $(this).attr("src", ($(this).data("animated")));
        } else {
            // set the image to be still
            $(this).attr("src", ($(this).data("still")));
        }
    }

    //startup button generation
    buttonGen();


    $(document).on("click", ".giphy", gifPause);
    $(document).on("click", ".search", gifSpoils);


});