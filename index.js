var apiKey = "89fa86e656fe98aeb4c2cbedb5da91b1"
var searchBtn = document.querySelector("#search-btn")
var searchInput =document.querySelector("#search-input")
var currentWeatherConatiner=document.querySelector("#current-weather")
var forecastContainer = document.querySelector("#forecast-container")
var historyArray = []
var historyContainer= document.querySelector("#history")

function getCurrentWeather(city){
    var url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(url)
    .then(res =>res.json())
    .then((data)=>{
        console.log(data);
        var lon = data.coord.lon
        var lat = data.coord.lat
        getForecast(lat, lon)
        displayCuurentWeather(data)
    })
}
function getForecast(lat, lon){
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(url)
    .then(res =>res.json())
    .then((data)=>{
        console.log(data);
        displayForecast(data)
        
    })

}
function displayCuurentWeather(data){
   currentWeatherConatiner.innerHTML =''
  //creating html elements that will hold the data
    var card= document.createElement("div")
    card.setAttribute("class", "card")
    var cardHeader=document.createElement("div")
    cardHeader.setAttribute("class", "card-header")
    var cardBody= document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    var title= document.createElement("h2")
    var temp= document.createElement("p")
    var humidity= document.createElement("p")
    var wind= document.createElement("p")
    var icon = document.createElement("img")
    var span= document.createElement("span")

    //adding the data to the elements
    icon.setAttribute("src", "https://openweathermap.org/img/w/"+ data.weather[0].icon +".png")
    title.textContent=data.name
    temp.textContent=`Temperature: ${data.main.temp} F`
    humidity.textContent=`Humidiy: ${data.main.humidity} %`
    wind.textContent=`Wind Speed: ${data.wind.speed} MPH`

    //append all elements
    span.append(icon)
    title.append(span)
    cardHeader.append(title)
    cardBody.append(temp, humidity, wind)
    card.append(cardHeader,cardBody)
    currentWeatherConatiner.append(card)

}   

// 5 days forecast
function displayForecast(data) {
    const {list} = data;
    const dayData =[];
    for(let i = 0; i < list.length; i += 8) {
        dayData.push(list[i]);
    }
    dayData.shift();
    forecastContainer.innerHTML = dayData
    .map((dailyData) => {
        const {dt, main, wind, weather} = dailyData;
        const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
        const date = new Date(dt * 1000).toLocaleDateString();
        return `<div class="forecast-day">
                    <h4>${date} <img src="${iconUrl}" alt="weather icon"></h4>
                    <p>Temperature: ${main.temp}°C</p>
                    <p>Humidity: ${main.humidity}%</p>
                    <p>Wind Speed: ${wind.speed} m/s</p>`;
    })
    .join('');
}

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    var cityInput = searchInput.value
getCurrentWeather(cityInput)
historyArray.push(cityInput)
localStorage.setItem('cities',historyArray)
})
function getCities() {
    var localStorageArray = localStorage.getItem("cities")
    for (let i = 0; i < localStorageArray.length; i++) {
        var cityName = document.createElement("")
        cityName.textContent = localStorageArray[i]
        historyContainer.appendChild(cityName)   
    }
 
}
 getCities();