const apiKey = 'f36397b03abc4b20b59145349241510';
const apiUrl = 'http://api.weatherapi.com/v1';

document.getElementById('searchBtn').addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = document.getElementById('city').value;
    if (city) {
        fetch(`${apiUrl}/current.json?key=${apiKey}&q=${city}&days=3`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
                fetchForecast(city);
            })
            .catch(error => {
                displayError(error.message);
            });
    }
}

function fetchForecast(city) {
    fetch(`${apiUrl}/forecast.json?key=${apiKey}&q=${city}&days=3`)
        .then(response => response.json())
        .then(data => displayForecast(data.forecast.forecastday))
        .catch(error => console.log(error));
}

function displayWeather(data) {
    document.getElementById('errorMsg').innerHTML = ''; 
    document.getElementById('cityName').textContent = data.location.name;
    document.getElementById('temp').textContent = data.current.temp_c;
    document.getElementById('condition').textContent = data.current.condition.text;
    document.getElementById('humidity').textContent = data.current.humidity;
    document.getElementById('wind').textContent = data.current.wind_kph;
}

function displayForecast(forecastDays) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = ''; 
    forecastDays.forEach(day => {
        const forecastDay = `
            <div>
                <h4>${new Date(day.date).toLocaleDateString()}</h4>
                <p><strong>Temp:</strong> ${day.day.avgtemp_c}°C</p>
                <p><strong>Condition:</strong> ${day.day.condition.text}</p>
            </div>
        `;
        forecastDiv.innerHTML += forecastDay;
    });
}

function displayError(message) {
    const errorDiv = document.getElementById('errorMsg');
    errorDiv.innerHTML = `<p class="error">${message}</p>`;
}
