var cityArray =[] ;
if( localStorage.getItem("#storedCities") !== null){
cityArray = JSON.parse(localStorage.getItem("storedCities"));
}

// search term and button 
$("#find-city").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input").val();
    cityArray.push(city);
    $(`<p><button class= "storedCities">${city}</button></p>`).appendTo("#storedCities")
    // main card api call
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var mainQueryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + city + "&units=imperial&appid=" + APIKey;

        $.ajax({
        url: mainQueryURL,
        method: "GET"
    })  
        .then(function (response) {
            var lat = (response.coord.lat);
            var lon = (response.coord.lon);
            // console.log(response)

            // main card info
            $(".city").html("<h1>" + response.name + "</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".temp").text("Temperature " + (Math.round(response.main.temp)) + " F");
            var iconCode = response.weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/wn/"+iconCode+"@2x.png";
            $("#wIcon").attr("src", iconUrl);

            // UV Index api call
            
            var APIKey = "166a433c57516f51dfab1f7edaed8413";
            var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" +APIKey + "&lat=" + lat + "&lon=" + lon;
                        
            $.ajax({
                url: uvQueryURL,
                method: "GET"
            })
            .then(function (response) {
              
                $(".uvIndex").text(response.value);
            });
        });
            
    // 5 day forcast api call
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + APIKey + "&q=" + city + "&count=5";

    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    })  
        
        .then(function (response) {
            console.log (response)

            // 5 day forcast
            $(".date1").text(response.list[0].dt_txt);
            var tempF1 = ((response.list[0].main.temp) - 273.15) * 1.80 + 32;
            $(".temp1").text("Temperature: " + (Math.round(tempF1)) + " F");
            $(".humidity1").text("Humidity: " + response.list[0].main.humidity);
            var iconCode1 = response.list[0].weather[0].icon;
            var iconUrl1 = "https://openweathermap.org/img/wn/"+iconCode1+"@2x.png";
            $("#wIcon1").attr("src", iconUrl1);

            $(".date2").text(response.list[7].dt_txt);
            var tempF2 = ((response.list[7].main.temp) - 273.15) * 1.80 + 32;
            $(".temp2").text("Temperature: " + (Math.round(tempF2)) + " F");
            $(".humidity2").text("Humidity: " + response.list[7].main.humidity);
            var iconCode2 = response.list[7].weather[0].icon;
            var iconUrl2 = "https://openweathermap.org/img/wn/"+iconCode2+"@2x.png";
            $("#wIcon2").attr("src", iconUrl2);
            
            $(".date3").text(response.list[15].dt_txt);
            var tempF3 = ((response.list[15].main.temp) - 273.15) * 1.80 + 32;
            $(".temp3").text("Temperature: " + (Math.round(tempF3)) + " F");
            $(".humidity3").text("Humidity: " + response.list[15].main.humidity);
            var iconCode3 = response.list[15].weather[0].icon;
            var iconUrl3 = "https://openweathermap.org/img/wn/"+iconCode3+"@2x.png";
            $("#wIcon3").attr("src", iconUrl3);

            $(".date4").text(response.list[23].dt_txt);
            var tempF4 = ((response.list[23].main.temp) - 273.15) * 1.80 + 32;
            $(".temp4").text("Temperature: " + (Math.round(tempF4)) + " F");
            $(".humidity4").text("Humidity: " + response.list[23].main.humidity);
            var iconCode4 = response.list[23].weather[0].icon;
            var iconUrl4 = "https://openweathermap.org/img/wn/"+iconCode4+"@2x.png";
            $("#wIcon4").attr("src", iconUrl4);

            $(".date5").text(response.list[31].dt_txt);
            var tempF5 = ((response.list[31].main.temp) - 273.15) * 1.80 + 32;
            $(".temp5").text("Temperature: " + (Math.round(tempF5)) + " F");
            $(".humidity5").text("Humidity: " + response.list[31].main.humidity);
            var iconCode5 = response.list[31].weather[0].icon;
            var iconUrl5 = "https://openweathermap.org/img/wn/"+iconCode5+"@2x.png";
            $("#wIcon5").attr("src", iconUrl5);
           
            localStorage.setItem("storedCities", JSON.stringify(cityArray));
            console.log(cityArray);  
        });
    });
    
function render(cityArray) {
}