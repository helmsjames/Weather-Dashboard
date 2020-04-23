$( document ).ready(function() {
 });

var APIKey = "1ab0bfe8d343049b298bfab694993cdd";
var searchedCity;
var queryURL;
var tempConversion = "&units=imperial";
var searchButton = document.querySelector("#submit");

//create the click handler for the search button
function buttonClickHandler(){
  var day1Array = [];
  console.log("Clicked!");
  citySearched = $("#city-input").val();
  // make an api call to retrieve info for City searched for
  queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearched + "&appid=" + APIKey + tempConversion;
        let cities = localStorage.getItem("cities");
        if(!cities) {
          cities = [];
        }
        else {
          cities = JSON.parse(cities);
        }
      //create a list of cities searched
        cities.push(citySearched);
        localStorage.setItem("cities", JSON.stringify(cities));
        const item = $(`<li class="list-group-item">${citySearched}</li>`);
        $("#cityStored").append(item);        
    
    //make an api call and passing the lat and long to get the uv index
    $.ajax({url: queryURL, method: "GET"}).then(function(response) {
      const uvUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${response.city.coord.lat}&lon=${response.city.coord.lon}`
      $.ajax({url: uvUrl, method: "GET"}).then(res => {
        console.log(response.list[0].main.temp);
        //create the card data 
        let cardData = $(
          `<h2>${citySearched}<span> ${new Date(response.list[0].dt_txt).toLocaleDateString()}</span><img class="icon" src=${response.list[0].icon}></h2>
          <h5>Temperature: ${response.list[0].main.temp} </h5>          
          <h5>Humidity:  ${response.list[0].main.humidity}</h5>         
          <h5>Wind Speed:  ${response.list[0].wind.speed}</h5>          
          <h5>UV Index:  ${res.value}</h5>`
        );
          $("#city-data").empty();
      //fill the card data with the response from above    
      $("#city-data").append(cardData);
      })
      console.log(response.list[0]);
      var i;
      //getting info for the weather icon
      for (i = 0; i < response.list.length; i+=8) {
        day1Array.push(Object.assign(response.list[i], {icon: `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`}));
      }  
      console.log(day1Array);
      //creating the 5-day forecast
      if ($("#five-day").has("div").length === 0){
          createForecast(day1Array);
      }
      else {
        $("#five-day > .col-sm-2").each(function(index, element){
          console.log("pair:",index, element);
          $(element).find('.temp').text(day1Array[index].main.temp);
          $(element).find('.icon').attr("src", day1Array[index].icon);
          $(element).find('.humidity').text(day1Array[index].main.humidity);          
      });
      }

      
    });
    day1Array = [];
  }
  function createForecast(day1Array){
    var outerElement = $("#five-day");
      for (let index = 0; index < 5; index++) {  
        //filling our card data with what we retrieved above      
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
  //set up the click handler for the city searched (retrieved from local storage)
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
        //output the city just searched from the input box to the list below it
          cities.push(citySearched);
          localStorage.setItem("cities", JSON.stringify(cities));
          const item = $(`<li>${citySearched}</li>`);

  
      $.ajax({url: queryURL, method: "GET"}).then(function(response) {
        console.log(response.list[0]);
        var i;
        for (i = 0; i < response.list.length; i+=8) {
          //get the weather icon
          day1Array.push(Object.assign(response.list[i], {icon: `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`}));
        }  
        console.log(day1Array);
  
        $("#five-day > .col-sm-2").each(function(index, element){
            console.log("pair:",index, element);
            $(element).find('.temp').text(day1Array[index].main.temp);
            $(element).find('.icon').attr("src", day1Array[index].icon);
            $(element).find('.humidity').text(day1Array[index].main.humidity);            
        });
      });
      day1Array = [];
    }

$(document).on("click", "li" , liClickHandler);
searchButton.addEventListener("click", buttonClickHandler);

