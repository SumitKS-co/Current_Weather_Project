let cityInp = document.querySelector(".cityInp");
let citySer = document.querySelector(".citySer");
let notfoundmsg = document.querySelector(".not-found-msg");
let citymsg = document.querySelector(".city-msg");
let weathermsg = document.querySelector(".weather-msg");

// Select elements to update
let locationText = document.querySelector(".loc h4");
let dateText = document.querySelector(".weather h5");
let tempText = document.querySelector(".temp-text");
let weatherCondition = document.querySelector(".season h3");
let weatherIcon = document.querySelector(".season img");
let humidityText = document.querySelector(".hum-info h5:nth-child(2)");
let windSpeedText = document.querySelector(".wind-info h5:nth-child(2)");

let apiKey = "0b8f3669542f5d1166fa3170926676a8";

citySer.addEventListener("click", function () {
    if (cityInp.value.trim() !== '') {
        UpdateWeatherInfo(cityInp.value);
        cityInp.value = '';
    }
});

cityInp.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && cityInp.value.trim() !== '') {
        UpdateWeatherInfo(cityInp.value);
        cityInp.value = '';
    }   
});

async function getFetchData(city) {  
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;  

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}  

async function UpdateWeatherInfo(city) {  
    let weatherData = await getFetchData(city);

    if (!weatherData || weatherData.cod != 200) {
        showDisplaySection(notfoundmsg);
        return; 
    }

    // Update UI with new weather data
    locationText.innerText = weatherData.name;
    tempText.innerText = `${Math.round(weatherData.main.temp)}°C`;
    weatherCondition.innerText = weatherData.weather[0].main;
    humidityText.innerText = `${weatherData.main.humidity}%`;
    windSpeedText.innerText = `${weatherData.wind.speed} m/s`;
    
    // Set weather icon dynamically
    let iconCode = weatherData.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


    let today = new Date();
    let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let formattedDate = `${weekdays[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]}`;
    dateText.innerText = formattedDate;

    // Show the weather section
    showDisplaySection(weathermsg);
}  

function showDisplaySection(element) {
    [citymsg, notfoundmsg, weathermsg].forEach(div => div.style.display = "none");
    element.style.display = "block"; // Show only the required section
}
