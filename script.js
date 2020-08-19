navigator.geolocation.getCurrentPosition((position) => {
  // console.log(position);
  const latitude = position.coords.latitude.toFixed(2);
  const longitude = position.coords.longitude.toFixed(2);

const uri = `https://api.weather.gov/points/${latitude},${longitude}/forecast`;

let data;
let forecast;
console.log(forecast);


const futureForecastTemplate = document.querySelector('[data-next-day-template]');
const futureForecastContainer = document.querySelector('[future-forecast]');

let h = new Headers();
h.append("Accept", "application/json"),
  ("User-Agent", ("myWeatherApp", "testing@yahoo.com"));
let reqTwo = new Request(uri, {
  method: "GET",
  headers: h,
  mode: "cors"
});

let selectedTimeDataIndex

getData().then(data => {
  selectedTimeDataIndex = data.length - data.length
  displayCurrentData(data)
  displayFutureData(data)
})

function displayCurrentData(data) {
  const selectedTime = data[selectedTimeDataIndex]
  document.querySelector('#weatherIcon').src = selectedTime.icon;
  document.querySelector("#weatherDay").innerHTML = selectedTime.name;
  document.querySelector(".weatherTemp").innerHTML = selectedTime.temperature;
  document.querySelector('#wind').innerHTML = selectedTime.windDirection;
  document.querySelector('#windSpeed').innerHTML = selectedTime.windSpeed;
  document.querySelector('#forcast').innerHTML = selectedTime.detailedForecast;
}

function displayFutureData(data) {
  futureForecastContainer.innerHTML = '';
  data.forEach((data, index) => {
    const forecastContainer = futureForecastTemplate.content.cloneNode(true);
    forecastContainer.querySelector('[next-name]').innerHTML = data.name;
    forecastContainer.querySelector('[temp-next]').innerHTML = data.temperature;
    forecastContainer.querySelector('[forecast-next]').innerHTML = data.shortForecast;
    forecastContainer.querySelector('[weather-icon]').src = data.icon;
    futureForecastContainer.appendChild(forecastContainer);
  })
  
}

function getData() {
  return fetch(reqTwo)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("bad http stuff");
      }
    })
    .then((forecastData) => {
      forecast = forecastData.properties.periods;
      // console.log(forecast);
      return Object.entries(forecast).map(([Object, forecast]) => {
        return {
          keys: Object,
          name: forecast.name,
          icon: forecast.icon,
          shortForecast: forecast.shortForecast,
          detailedForecast: forecast.detailedForecast,
          temperature: forecast.temperature,
          temperatureUnit: forecast.temperatureUnit,
          windDirection: forecast.windDirection,
          windSpeed: forecast.windSpeed
        };
      });
    });
}
  const uriTwo = `https://api.weather.gov/points/${latitude},${longitude}`
  
  let req = new Request(uriTwo, {
  method: "GET",
  headers: h,
  mode: "cors"
  });
  
  fetch(req).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("bad http stuff");
      }
    })
  .then((locationData) =>{
    const location = locationData.properties.relativeLocation.properties;
    const city = location.city;
    const state = location.state;
    document.querySelector('[location-city]').innerHTML = city;
    document.querySelector('[location-state]').innerHTML = state;
  })
})

