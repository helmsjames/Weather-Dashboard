$( document ).ready(function() {
 });

var APIKey = "1ab0bfe8d343049b298bfab694993cdd";
var searchedCity;
var queryURL;
var tempConversion = "&units=imperial";
var searchButton = document.querySelector("#submit");
var temp1 = document.querySelector("#temp-1");
  var hum1 = document.querySelector("#hum-1");

function buttonClickHandler(){
  var day1Array = [];
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
        const item = $(`<li class="list-group-item">${citySearched}</li>`);
        $("#cityStored").append(item);

    $.ajax({url: queryURL, method: "GET"}).then(function(response) {
      const uvUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${response.city.coord.lat}&lon=${response.city.coord.lon}`
      $.ajax({url: uvUrl, method: "GET"}).then(res => {
        let cardData = $(
          `<h2>${citySearched}</h2>
          <span>Temperature:  </span>
          <br>
          <span>Humidity:  </span>
          <br>
          <span>Wind Speed:  </span>
          <br>
          <span>UV Index:  ${res.value}</span>`
        );
      $("#city-data").append(cardData);
      })
      console.log(response.list[0]);
      var i;
      for (i = 0; i < response.list.length; i+=8) {
        day1Array.push(Object.assign(response.list[i], {icon: `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`}));
      }  
      console.log(day1Array);

      if ($("#five-day").has("div").length === 0){
          createForecast(day1Array);
      }
      else {
        $("#five-day > .col-sm-2").each(function(index, element){
          console.log("pair:",index, element);
          $(element).find('.temp').text(day1Array[index].main.temp);
          $(element).find('.icon').attr("src", day1Array[index].icon);
          $(element).find('.humidity').text(day1Array[index].main.humidity);
          $(element).find('.uv-index').text(day1Array[index].main.uvIndex);
      });
      }

      
    });
    day1Array = [];
  }
  function createForecast(day1Array){
    var outerElement = $("#five-day");
      for (let index = 0; index < 5; index++) {        
        var card = $(`<div class="col-sm-2 card-body">
        <h5 class="card-title date">${new Date(day1Array[index].dt_txt).toLocaleDateString()}</h5>
        <img class="icon" src="${day1Array[index].icon}"> 
        <br>       
        Temp: <span class="card-text temp">${day1Array[index].main.temp}&#8457;</span>
        <br>
        Humidity: <span class="card-text humidity">${day1Array[index].main.humidity}&#37;</span>        
      </div>`);
        outerElement.append(card)
      }

  }

  function liClickHandler(){
    var day1Array = [];
    console.log("Clicked!");
    citySearched = $(this)[0].innerText;
    console.log(citySearched)
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
          const item = $(`<li>${citySearched}</li>`);

  
      $.ajax({url: queryURL, method: "GET"}).then(function(response) {
        console.log(response.list[0]);
        var i;
        for (i = 0; i < response.list.length; i+=8) {
          day1Array.push(Object.assign(response.list[i], {icon: `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`}));
        }  
        console.log(day1Array);
  
        $("#five-day > .col-sm-2").each(function(index, element){
            console.log("pair:",index, element);
            $(element).find('.temp').text(day1Array[index].main.temp);
            $(element).find('.icon').attr("src", day1Array[index].icon);
            $(element).find('.humidity').text(day1Array[index].main.humidity);
            $(element).find('.uv-index').text(day1Array[index].main.uvIndex);
        });
      });
      day1Array = [];
    }



$(document).on("click", "li" , liClickHandler);
searchButton.addEventListener("click", buttonClickHandler);

