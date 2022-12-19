// DEFINE KEY ITEMS
let cityInput = document.getElementById("city"); // user input
let citiesList = []; // build list for local storage in empty array
let todayDate = document.getElementById("todayDate");
let cityForm = document.getElementById("formCity"); // form for input
let buttons = document.getElementById("buttons"); // buttons past search
let cityEl = document.querySelector("#searchedCity"); // city as displayed

// API CALLS

// GET WEATHER FOR TODAY DISPLAY
// My API Key: 4204bfdd6f4f063ef67429ec56df1142
let getWeather = (city) => {
  let apiURL1 = "://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=4204bfdd6f4f063ef67429ec56df1142";
  fetch(apiURL1)
    .then((response) => {
        response.json()
          .then((data) => {
              // getWeather => showWeather
              showWeather(data, city);
            });
      });
};