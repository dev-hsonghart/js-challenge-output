
const MORNING_LS = "morningText",
  DAY_LS = "dayText",
  EVENING_LS = "evegningText",
  NIGHT_LS = "nightText";

const helloMorning = [
  "안녕하세요.🤘🏻",
  "좋은 아침이에요.",
  "오늘 점심은 뭘 먹나요?",
  "😴 아침은 늘 힘들어요."
],
helloDay = [
  "날이 좋으면 산책 어때요? 😉",
  "🍚 점심 먹어야죠!",
  "집안일하기 좋은 시간~"
],
helloEvening = [
  "저녁 드셨어요?",
  "뭘 하며 쉴까요? 👀",
  "12시 전엔 자야돼요!"
],
helloNight = [
  "🥱 시간이 늦었어요!",
  "이제 침대에서 쉴까요? 😉",
  "올빼미 같으니라구! 🌙"
]
const displayHello = document.querySelector(".print-hello");

function printHello(){  
  currentTime = new Date(),
  hour = currentTime.getHours();

  function randomHello(a){ // 배열안에서 랜덤 뽑기
    return a[Math.floor(Math.random() * a.length)]
  }

  if(hour >= 6 && hour < 12 )// 6~12 아침
    {   
      displayHello.innerText = randomHello(helloMorning);
    }
  else if(hour >= 12 && hour < 18)// 12~18 점심
    {
      displayHello.innerText = randomHello(helloDay);
    }
  else if(hour >= 18 && hour < 24)// 18~24 저녁
    {
      displayHello.innerText = randomHello(helloEvening);
    }
  else if(hour >= 0 && hour < 6) // 00~6 새벽
    {
      console.log(("test"));
      displayHello.innerText = randomHello(helloNight);
    }
  
}

function setHelloText(){
  localStorage.setItem(MORNING_LS, JSON.stringify(helloMorning))
  localStorage.setItem(DAY_LS, JSON.stringify(helloDay))
  localStorage.setItem(EVENING_LS, JSON.stringify(helloEvening))
  localStorage.setItem(NIGHT_LS, JSON.stringify(helloNight))
}

function init(){
  setHelloText(); // 로컬스토리지에 문구 저장
  if(displayHello.innerText === ""){
    printHello();
  } 
    setInterval(printHello, 60000)

   // 한시간마다 다른 인삿말 출력
}

init();
