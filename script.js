const apiKey = '613d17aa5f428c3e3bd04bae59222c57';
const weatherDisplay = document.getElementById('weather-display');
const locationInput = document.getElementById('location-input');
const getWeatherBtn = document.getElementById('get-weather');
const getLocationBtn = document.getElementById('get-location');

// Fetch weather by city name
getWeatherBtn.addEventListener('click', () => {
    const city = locationInput.value;
    if (city) {
        fetchWeatherByCity(city);
    } else {
        displayError('Please enter a city name.');
    }
});

// Fetch weather by user's current location
getLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon);
            },
            () => {
                displayError('Unable to retrieve your location.');
            }
        );
    } else {
        displayError('Geolocation is not supported by your browser.');
    }
});

// Fetch weather data by city name
function fetchWeatherByCity(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchWeatherData(apiURL);
}

// Fetch weather data by coordinates
function fetchWeatherByCoords(lat, lon) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetchWeatherData(apiURL);
}

// Fetch weather data from API
function fetchWeatherData(apiURL) {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                displayError(data.message);
            }
        })
        .catch(() => {
            displayError('Failed to fetch weather data.');
        });
}

// Display weather data
function displayWeather(data) {
    const { name, main, weather, wind } = data;
    weatherDisplay.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Feels Like: ${main.feels_like} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}

// Display error message
function displayError(message) {
    weatherDisplay.innerHTML = `<p style="color: red;">${message}</p>`;
}
