// 1. 새로고침 시 배경이미지가 랜덤으로 뿌려진다.

const bg = document.querySelector(".background-container");
  
function getRandomNum(){
  return Math.floor(Math.random() * 226);
}

function displayBg(){
  bg.style.background = `linear-gradient(to right, rgba(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()}), rgba(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()}))`
  bg.style.opacity = 0;
}

function init(){
  displayBg();
  setInterval(displayBg, 30000);
}

init();