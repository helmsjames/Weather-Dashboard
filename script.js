// $( document ).ready(function() {
//     console.log( "ready!" );
// });
var APIKey = "1ab0bfe8d343049b298bfab694993cdd";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
  })

$("#submit").click(function callAPI(){$.ajax({url: queryURL, method: "GET"}).then(function(response) {
    console.log(queryURL);
    console.log(response);
});

    $("#submit").click(function(){
      alert("The paragraph was clicked.");
    });
  // $.ajax({
//     url: "http://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=1ab0bfe8d343049b298bfab694993cdd&units=imperial",
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//   });

  function displayWeather(cityName, windSpeed, humidity, temperature){

    $(".city").html("city name: " + cityName);
    $(".wind").html("wind speed: " + response.wind.speed);
    $(".humidity").html("humidity: " + response.main.humidity);
    $(".temp").html("temp: " + response.main.temp);
    };

    displayWeather(response.name);

//   https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=1ab0bfe8d343049b298bfab694993cdd

// var weather;
// var api = "http://api.openweathermap.org/data/2.5/forecast?q";
// var apiKey = "APPID=524901&APPID=1ab0bfe8d343049b298bfab694993cdd";
// var units = "&units=imperial";

// var input;

// function(setup) {
//     var button = select('#submit');
//     button.mousePressed(weatherSearch);

//     input = select('#city');
// }  
//     function weatherSearch(){
//         var url = api + input.value() + apiKey + units;
//         loadJSON(url, gotData);

// }

// function gotData(data) {
//     weather = data;
// }
