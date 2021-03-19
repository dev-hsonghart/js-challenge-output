const inputContainer = document.querySelector(".input-container");

const USER_LS = localStorage.getItem("userName"),
  MORNING_LS = "morningText",
  LUNCH_LS = "lunchText",
  DINNER_LS = "dinnerText",
  NIGHT_LS = "nightText"

const helloMorning = [
  "안녕하세요.🤘🏻",
  "좋은 아침이에요."
],
helloLunch = [
  "오늘 점심은 뭘 먹나요?",
  "점심 먹어야죠!"
],
helloDinner = [
  "저녁 드셨어요?",
  "뭘 하며 쉴까요?"
],
helloNight = [
  "시간이 늦었어요!",
  "이제 침대에서 쉬어요."
]

function setHelloText(){
  localStorage.setItem(MORNING_LS, JSON.stringify(helloMorning))
  localStorage.setItem(LUNCH_LS, JSON.stringify(helloLunch))
  localStorage.setItem(DINNER_LS, JSON.stringify(helloDinner))
  localStorage.setItem(NIGHT_LS, JSON.stringify(helloNight))
}

function displayHello(){
  const currentTime = new Date(),
  hour = currentTime.getHours();

  if(hour >6 && hour < 12 )// 6~12
  {
    
  }
}

function printHello(){
  const displayHello = document.querySelector(".print-hello");

  if(USER_LS !== null){
    displayHello()
  }
}


function init(){
  printHello();
}

init();
