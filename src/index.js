function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector(".icon");


    iconElement.innerHTML = `<img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png" class="weather-app-icon" />`;

    cityElement.innerHTML = response.data.city;
    // Using Math.round to round the temperature to the nearest integer
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    
    getForecast(response.data.city);
} 

function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

return `${day} ${hours}:${minutes}`; // Plsaceholder for the date format, can be customized

}

function searchCity(city) {
    // separation of concerns: API key is stored in a variable
let apiKey =  "b2a5adcct04b33178913oc335f405433"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
event.preventDefault();
let searchInput = document.querySelector("#search-form-input");

searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
let apiKey = "096041afb416o806a3dd39726t99bf5a"
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
console.log(apiUrl);
}

function displayForecast(response) {
console.log(response.data);

    
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml = 
        forecastHtml +
         `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        
        <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}° </strong> 
            </div>
            <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
            )}°</div> 
        </div>
        </div>
        `;
        }
    });

        let forecastElement = document.querySelector("#forecast");
        forecastElement.innerHTML = forecastHtml;
        
            
    


}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Cape Town"); // default city on page load
 



