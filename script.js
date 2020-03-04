// $( document ).ready(function() {
//     console.log( "ready!" );
// });

//onsubmit


var APIKey = "1ab0bfe8d343049b298bfab694993cdd";
var searchedCity;
var queryURL;
var tempConversion = "&units=imperial";

$("#submit").click(function(){
  console.log("Clicked!");
  citySearched = $("#city-input").val();
   queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearched + "&appid=" + APIKey + tempConversion;
  let cities = localStorage.getItem("cities");
  if(!cities) {
    cities = [];
  }
  else {
    cities = JSON.parse(cities);
  }

  cities.push(citySearched);
  localStorage.setItem("cities", JSON.stringify(cities));
});

// $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
  var searchButton = document.querySelector("#submit");
  var temp1 = document.querySelector("#temp-1");
  var hum1 = document.querySelector("#hum-1");

  var day1Array = [];

  searchButton.addEventListener("click", function() {
    $.ajax({url: queryURL, method: "GET"}).then(function(response) {
      console.log(response.list[0]);
      var i;
      for (i = 0; i < response.list.length; i+=8) {
        day1Array.push(Object.assign(response.list[i], {icon: `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`}));
      }  
      console.log(day1Array);
      
      $("#five-day > .col-sm-2").each(function(index, element){
          console.log(index, element);
          $(element).find('.temp').text(day1Array[index].main.temp);
          $(element).find('.icon').attr("src", day1Array[index].icon);
          $(element).find('.humidity').text(day1Array[index].main.humidity);
          $(element).find('.uv-index').text(day1Array[index].main.uvIndex);
      });
    });
  });



  // $.ajax({
//     url: "http://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=1ab0bfe8d343049b298bfab694993cdd&units=imperial",
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//   });



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
