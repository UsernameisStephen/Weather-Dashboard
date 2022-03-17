var apikey = "c4049c9bed52200b02a13efaf2af5755";
var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
.querySelector(".search-bar")
//fetch to get the weather api
let weather = {
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )

//going to need to loop something 
for (var i = 0; i < localStorage.length; i++) 

