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

// SUBMIT CITY SEARCH AND STORE CITY SEARCH

// submitQuery => listCity, getWeather, getForecast
let submitQuery = (event) => {
  event.preventDefault();
  let cityEl = cityInput.value.trim();
  let btn = document.createElement("button"); // need to add in no blank button without this breaking
  btn.className = "searched-list btn";
  btn.innerHTML = cityEl; // need to add in no dupe button needed, maybe capitalization standardization
  buttons.appendChild(btn);
  listCity();
  if(!citiesList.includes(cityEl) && (cityEl != "")) {
    citiesList.push(cityEl);
  };
  localStorage.setItem("citiesList", JSON.stringify(citiesList));
  if(cityEl) {
    getWeather(cityEl);
    getForecast(cityEl);
    cityInput.value = "";
  } else {
    alert("Enter a city name to get the weather!");
  }
};

// PAST CITY SEARCHES
let listCity = () => {
  citiesList = JSON.parse(localStorage.getItem("citiesList"));
  if(!citiesList) {
    citiesList = [];
  };
};

// ADD BUTTONS TO SEARCH HISTORY
let addList = () => {
  for(var i = 0; i < citiesList.length; i++) {
    let btn = document.createElement("button");
    btn.className = "searched-list btn"; // one for identifying as list item, one for styling
    btn.innerHTML = citiesList[i];
    buttons.appendChild(btn); // maybe add a clear buttons option in future
  };

  // USE PAST SEARCH BUTTON
  let listButtons = document.querySelectorAll(".searched-list");
  for(var i = 0; i < listButtons.length; i++) {
    listButtons[i].addEventListener("click", (event) => {
      getWeather(event.target.textContent);
      getForecast(event.target.textContent);
    })
  }
};