// html요소 불러오기
const leftColumn = document.querySelector(".left"),
paintMonth = leftColumn.querySelector(".month"),
paintDate = leftColumn.querySelector(".date"),
paintDay = leftColumn.querySelector(".day"),

rightColumn = document.querySelector(".right"),
paintTime = rightColumn.querySelector(".current-clock");


function getTime(){
  // 현재 날짜 시간 불러오기
  const currentTime = new Date(),
  month = currentTime.getMonth() +1,
  date = currentTime.getDate(),
  day = currentTime.getDay(),
  dayList = ["일","월","화","수","목","금","토"],
  dayValue = dayList[day],
  hour = currentTime.getHours(),
  minutes = currentTime.getMinutes();

  // 데이터 출력하기
  paintMonth.innerText = `${month}`;
  paintDate.innerText = `${date}`;
  paintDay.innerText = `${dayValue}`
  paintTime.innerText = `${hour < 0 ? `0${hour}` : hour}:${minutes < 0 ? `0${minutes}` : minutes}`;
}

function init(){
  getTime();
  setInterval(getTime, 60000);
}

init();
