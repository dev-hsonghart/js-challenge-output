// 1. 현재 위치 좌표를 가져온다.
// 2. 날씨 API를 이용하여 현지 위치의 날씨 정보를 가져온다.
// 3. 위치, 온도, 날씨를 html에 뿌린다.
// 4. 날씨는 이모지로 표현한다.
// 5. 위치는 로컬스토리지에 저장한다.

const citiWeatherContainer = document.querySelector(".current-weather"),
  cityDisplay = citiWeatherContainer.querySelector(".current-location"),
  tempDisplay = citiWeatherContainer.querySelector(".current-tem"),
  skyDisplay = citiWeatherContainer.querySelector(".current-sky"),
  locationError = citiWeatherContainer.querySelector(".access-error");

const COORDS = "coords",
  API_KEY = "27367b2eb2f00db5a8a1e6b5cb618646";

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
  .then(
    function(response){
    return response.json();
    }
  )
  .then(
    function(json){
      const currentCity = json.name,
        currentTemp = Math.floor(json.main.temp),
        currentWeather = json.weather[0].main;
      
      cityDisplay.innerText = currentCity;
      tempDisplay.innerText = `${currentTemp} ˚`;

      if(currentWeather === "Clouds") skyDisplay.innerText = "☁️";//날씨가 흐릴 때 
      if(currentWeather === "Thunderstorm") skyDisplay.innerText = "⛈";//날씨가 천둥번개일 때 
      if(currentWeather === "Drizzle")skyDisplay.innerText = "🌦"; //날씨가 부슬비 때 
      if(currentWeather === "Rain") skyDisplay.innerText = "🌧";//날씨가 비 내랄 때 
      if(currentWeather === "Snow") skyDisplay.innerText = "❄️";// 날씨가 눈 내릴 때
      if(currentWeather === "Clear") skyDisplay.innerText = "☀️";//날씨가 화찰할 때
        // 애니메이션
      if(skyDisplay.innerText !== ""){
        cityDisplay.classList.remove("none");
        tempDisplay.classList.remove("none");
        skyDisplay.classList.remove("none");
        showAnimation();
      } 
    }
  )
}

function handleGeoError(){
  locationError.innerText = "위치 정보가 없어요📍";
  cityDisplay.classList.add("none");
  tempDisplay.classList.add("none");
  skyDisplay.classList.add("none");
  showAnimation();
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function showAnimation(){
  const overflow =  citiWeatherContainer.querySelector(".weather-overflow");

  overflow.style.animation = "to-top 1s ease-in forwards";
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude,
  longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
