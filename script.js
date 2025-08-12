const cityInput = document.querySelector('.city-input')
const searchBtn = document.querySelector('#search-btn')
const cityName = document.querySelector('#city-name')
const currentDate = document.querySelector('.current-date')
const censius = document.querySelector('.censius')
const condition = document.querySelector('.current-sky')
const humidityParcentage = document.querySelector('.humidity-percentage')
const windSpeed = document.querySelector('#wind-speed')
const apiKey = '8dd10c183dd2dd6f023cfe86911dd030'
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey};`





searchBtn.addEventListener('click' , ()=>{
     if(cityInput.value.trim() != ''){
        console.log(cityInput.value)
        cityInput.value = '';
     }
})

cityInput.addEventListener('keydown' , (event)=>{
    if(event.key == 'Enter' && cityInput.value.trim() != ''){
        console.log(cityInput.value)
        cityInput.value = '';
    }
})