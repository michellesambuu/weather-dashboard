var apiKey = "89fa86e656fe98aeb4c2cbedb5da91b1"
var searchBtn = document.querySelector("#search-btn")
var searchInput =document.querySelector("#search-input")
var currentWeatherConatiner=document.querySelector("#current-weather")
function getCurrentWeather(city){
    var url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
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
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(url)
    .then(res =>res.json())
    .then((data)=>{
        console.log(data);
        displayForecast(data)
        
    })

}
function displayCuurentWeather(data){
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

function displayForecast(data){
    
    for(let i=0; i< 6; i++){
     var forIn= i*8+4
     var day= new Date (data[forIn].dt*1000)
    }

}


searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    var cityInput = searchInput.value
getCurrentWeather(cityInput)
})