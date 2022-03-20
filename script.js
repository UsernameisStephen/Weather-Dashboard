//global variables
const apiKey = "c4049c9bed52200b02a13efaf2af5755";
let searchButton = $(".input-group-btn");



for (let i = 0; i < localStorage.length; i++) {

  let city = localStorage.getItem(i);
 
  let cityName = $(".list-group").addClass("list-group-item");

  cityName.append("<li>" + city + "</li>");

searchButton.click(function () {
  let keyCount= 0;
  let searchIn = $(".searchInput").val();
  let urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchIn + "&Appid=" + apiKey + "&units=imperial";
  let urlfiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchIn + "&Appid=" + apiKey + "&units=imperial";


  // using ajax to update the page and get data after the page reloads
  if (searchIn == "") {
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            let cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            keyCount = keyCount + 1;

            //append to get current weather
            let currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            let currentName = currentCard.append("<p>");
            currentCard.append(currentName);

          //append to get date
            let timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
          //append to get temp
            let currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
          //append to get humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
          //append to get wind
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

          //method to pull the uv index
            let urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                let currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });

        });

        //method to pull the five day forecast
        $.ajax({
            url: urlfiveDayForecast,
            method: "GET"
        }).then(function (response) { 
            let day = [0, 8, 16, 24, 32];
            let fiveDayDiv = $(".fiveDays").addClass("card-text");
            fiveDayDiv.empty();
          
            day.forEach(function (i) {
                let fiveDayForecastTimeUTC1 = new Date(response.list[i].dt * 1000);
                fiveDayForecastTimeUTC1 = fiveDayForecastTimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=fiveDayForecastColor>" + "<p>" + fiveDayForecastTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
            })
         
         });   
      
    }
  });
}  