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

// GET 5-DAY FORECAST + UV DATA
let getForecast = (city) => {
  let apiURL3 = "://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=4204bfdd6f4f063ef67429ec56df1142";
  fetch(apiURL3)
    .then((response) => {
      response.json()
        .then((data) => {
          // getForecast => showForecast
          showForecast(data, city);
          // DEFINE LAT AND LON VALUES AS VARIABLES
          let lat = data.city.coord.lat;
          let lon = data.city.coord.lon;
          // GET UV DATA BASED ON CITY LAT/LON COORDINATES
          let getTodayUV = (city) => {
            let apiURL2 = "://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=4204bfdd6f4f063ef67429ec56df1142";
            fetch(apiURL2)
              .then((response) => {
                response.json()
                  .then((data) => {
                    // SET COLOR CODED CLASS BASED ON UV VALUE
                    document.getElementById("todayUV")
                      .innerHTML = data.value;
                    if(data.value <= 3) {
                      document.getElementById("todayUV")
                        .setAttribute("class", "favorableLevel");
                    } else if(data.value > 3 && data.value <=10) {
                      document.getElementById("todayUV")
                        .setAttribute("class", "moderateLevel");
                    } else { 
                      document.getElementById("todayUV")
                        .setAttribute("class", "severeLevel");
                    };
                  });
              });
          };
          getTodayUV();
        });
    });
};