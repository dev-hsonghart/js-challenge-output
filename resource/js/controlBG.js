// 1. 새로고침 시 배경이미지가 랜덤으로 뿌려진다.

const bg = document.querySelector(".background-container");
  
function getRandomNum(){
  const number = Math.floor(Math.random() * 4);
  return number;
}

function displayBg(num){
  const image = new Image();
  image.src = `images/img/0${num + 1}.jpg`;
  bg.appendChild(image);
  image.classList.add("background-img");
  
}

function init(){
  const randomNum = getRandomNum();
  displayBg(randomNum);
}

init();