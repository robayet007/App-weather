const cityInput = document.querySelector('.city-input')
const searchBtn = document.querySelector('#search-btn')
const cityName = document.querySelector('#city-name')
const currentDate = document.querySelector('.current-date')
const censius = document.querySelector('.censius')
const condition = document.querySelector('.current-sky')
const humidityParcentage = document.querySelector('.humidity-parcentage')
const windSpeed = document.querySelector('#wind-speed')
const apiKey = '8dd10c183dd2dd6f023cfe86911dd030'
const weatherInfoSection = document.querySelector('.weather-info-section')
const searchCitySection = document.querySelector('.search-city-container')
const notFoundSection = document.querySelector('.not-found-city')
const weatherSummeryImg = document.querySelector('#weather-summery-img')
const foreCastContainer = document.querySelector('.forecast-container')




searchBtn.addEventListener('click' , ()=>{
     if(cityInput.value.trim() != ''){
        getWeatherInfo(cityInput.value)
        cityInput.value = '';
     }
})

cityInput.addEventListener('keydown' , (event)=>{
    if(event.key == 'Enter' && cityInput.value.trim() != ''){
        getWeatherInfo(cityInput.value)
        cityInput.value = '';
    }
})


async function getDataFetch(endPoint , city) {
    const apiUrl =  `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(apiUrl)
    return response.json()

}

async function getWeatherInfo(city) {
  const weatherData = await getDataFetch('weather' , city)
  if(weatherData.cod != 200){
    showDisplaySection(notFoundSection)
    setTimeout(()=>{
      showDisplaySection(searchCitySection)
    },2000)
    return;
  }
  showDisplaySection(weatherInfoSection)

  const {
    name: country,
    main:{humidity , temp},
    wind: {speed},
    weather:[{id , main}]
  } = weatherData;
  weatherSummeryImg.src =`./weather/${getFetchImg(id)}`
  
  cityName.innerText = country;
  censius.innerText = Math.round(temp) + '℃';
  condition.innerText = main;
  humidityParcentage.innerText = humidity + '%'
  windSpeed.innerText = speed + 'M/s';
  currentDate.innerText = getCurrentDate()
  await  getForecastData(city)
}


async function getForecastData(city) {
    const foreCastData = await getDataFetch('forecast' , city)
    let timetake = '12:00:00'
    let todayDate = new Date().toISOString().split('T')[0]
    foreCastContainer.innerHTML =''
    foreCastData.list.forEach(foreCastweather =>{
      if(foreCastweather.dt_txt.includes(timetake) &&
      !foreCastweather.dt_txt.includes(todayDate)){
        getUpdateItem(foreCastweather)
      }
    })
}

function  getUpdateItem(weatherData){
     const  {
        dt_txt: date,
        weather: [{id}],
        main: { temp }
     } = weatherData

     const dateTaken = new Date(date)
     const dateOption = {
      day : 'numeric',
      month: 'short'
     }

     const foreCastDate = dateTaken.toLocaleDateString('en-US' , dateOption)
     
     const forecastItem = `
          <div id="forecast-item" class="forecast-item text-font">
                <p>${foreCastDate}</p>
                <img src="./weather/${getFetchImg(id)}" alt="">
                <p>${Math.round(temp)}℃</p>
          </div>
     `
    foreCastContainer.insertAdjacentHTML('beforeend', forecastItem);

}


function getCurrentDate(){
  const today = new Date()
  const option = {
    weekday :'short',
    day : 'numeric',
    month: 'short',
  }
 return today.toLocaleDateString('en-US' , option)
}

 function getFetchImg(id) {
 if( id <= 232) return 'thunderstorm.svg';
 if( id <= 331) return 'drizzle.svg';
 if( id <= 531) return 'rain.svg';
 if( id <= 622) return 'snow.svg';
 if( id <= 781) return 'atmosphere.svg'
 if( id <= 800) return 'clear.svg'
  else return 'clouds.svg'
 }



function showDisplaySection(section){
    [notFoundSection , weatherInfoSection , searchCitySection]
    .forEach(section => section.style.display = 'none')
    section.style.display = 'grid'
}

