const searchButton = document.getElementById("searchButton");
const searchLocation = document.getElementById("searchLocation");
const form = document.querySelector(".flexHeader");
const content = document.querySelector(".weatherDetails");
const currentTemperature = document.querySelector(".temperature");
const nextTemperature = document.querySelectorAll(".nexTemperature");
const nextWeatherReport = document.querySelectorAll(".nextWeatherReport");
const weatherReport = document.querySelector(".weatherReport");
const date = document.querySelector(".date");
const nextDate = document.querySelectorAll(".nextDate");
const currentLocation = document.querySelector(".location");
const dayTemperature = document.querySelectorAll(".daySunriseSunset");
const weatherImage = document.querySelectorAll(".weatherImage");
const image = document.querySelector("#image");
const daysDescription = document.querySelectorAll(".days-description");
const daysContainer = document.querySelectorAll(".daysContainer");
const daysTime = document.querySelectorAll(".days-time");
const weatherDiv = document.querySelector(".weather-div");
const loader = document.querySelector(".loader")

for (let i = 0; i < daysContainer.length; i++) {
  daysContainer[i].addEventListener("mouseover", () => {
    daysTime[i].style.display = "block";
    dayTemperature[i].style.display = "none";
  });

  daysContainer[i].addEventListener("mouseout", () => {
    daysTime[i].style.display = "none";
    dayTemperature[i].style.display = "block";
  });
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchLocation.value == "") {
    alert("type in a location");
    return ;
  } else {
    loader.style.display = "block"
    let latitude;
    let longitude;
  const input = searchLocation.value;
  const apiKey = "e15328c91f796bf73b5882ed29720192";
  const geocodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${apiKey}`;

  fetch(geocodeApi)
    .then((response) => response.json())
    .then((data) => {
      latitude = data[0].lat;
      longitude = data[0].lon;
      const locObject = {
        place: data[0].name,
        country: data[0].country,
      };
      searcH(latitude, longitude, locObject);
    });

  searchLocation.value = "";
  }
});

function searcH(lat, lon, loc) {
  const apiKey = "e15328c91f796bf73b5882ed29720192";
  const oncallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(oncallApi)
    .then((res) => res.json())
    .then((data) => {
      const { current, daily } = data;

      const dt = current.dt;
      const time = new Date(dt * 1000);
      const dT = time.getUTCDate();

      let weekday = [
        "Sunday",
        "Monday",
        "Tueday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let dW = weekday[time.getDay()];
      let months = [
        "January",
        "Feburary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let dM = months[time.getMonth()];
      let dY = time.getFullYear();
      loader.style.display = "none"
      weatherDiv.style.display = "flex";
      currentLocation.innerHTML = loc.place + " " + "/" + " " + loc.country;
      currentTemperature.innerHTML = Math.round(current.temp) + "℃";
      weatherReport.innerHTML = data.current.weather[0].description;
      date.innerHTML = dW + ", " + dM + " " + dT + ", " + dY;
      image.src = `https://openweathermap.org/img/wn/${current.weather[0]["icon"]}@2x.png`;
      image.alt = current.weather[0].description;
      let arr = daily;

      for (let i = 0; i < dayTemperature.length; i++) {
        daysContainer[i].style.display = "block";

        const times = new Date(arr[i].dt * 1000);
        const dTs = times.getUTCDay();
        let hours = times.toLocaleTimeString();
        let weekday = [
          "Sunday",
          "Monday",
          "Tueday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let dWs = weekday[dTs];

        nextDate[i].innerHTML = dWs;
        daysTime[i].innerHTML = hours;

        weatherImage[
          i
        ].src = `https://openweathermap.org/img/wn/${arr[i].weather[0]["icon"]}@2x.png`;
        daysDescription[i].innerHTML = arr[i].weather[0].description;
        dayTemperature[i].innerHTML = Math.round(arr[i].temp.day) + "℃";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
