$(document).ready(function() {
    $("#search-button").on("click", function() {
        var searchSection = $("#search-section").val();

        $("#search-section").val("");

        weatherSearch(searchSection);
    });

    $(".history").on("click", "li", function() {
        weatherSearch($(this).text());
    });

    function createRow(text) {
        var p = $("<p>").text(text);
        $(".history").append(p);
    }

    function weatherSearch(searchSection) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchSection + "&appid=37f8360911220194f3b13df92ea22364&units=imperial",
            dataType: "json",
            success: function(data) {
                if (currentHistory.indexOf(searchSection) === -1) {
                    currentHistory.push(searchSection);
                    window.localStorage.setItem("history", JSON.stringify(currentHistory));

                    createRow(searchSection);
                }


                $("#current").empty();

                var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
                var card = $("<div").addClass("card");
                var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
                var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
                var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + "°F");
                var cardBody = $("<div>").addClass("card-body");
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

                title.append(img);
                cardBody.append(title, temp, humid, wind);
                card.append(cardBody);
                $("#current").append(card);

                getForecast(searchSection);
                getUVIndex(data.coord.lat, data.coord.lon);
            }
        });
    }

    // var currentHistory = JSON.parse(window.localStorage.getItem("history")) || [];

    // if (currentHistory.length > 0) {
    //     weatherSearch(currentHistory[currentHistory.length-1]);
    // }

    // for (var i = 0; i < currentHistory.length; i++) {
    //     (currentHistory[i]);
    // }
});