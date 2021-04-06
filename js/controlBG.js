// 1. 30초마다 배경 색상이 랜덤으로 뿌려진다.

const bg = document.querySelector(".background-container");

let rgbA= [0, 0, 0],
  rgbB = [0, 0, 0];

function rgbInit(){
  rgbA = [0,0,0];
  rgbB = [0,0,0];
}

function randomRGB(array){
  for(let i = 0; i < 2 ; i++){
    array[i] = getRandomNum();
  }
  return array;
}

function shuffleArray(array){
  for(let i =0; i< array.length; i++){
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomNum(){
  return Math.floor(Math.random() * 256) + 139;
}

function displayBg(){
  rgbInit();
  randomRGB(rgbA);
  randomRGB(rgbB);
  shuffleArray(rgbA);
  shuffleArray(rgbB);

  bg.style.background = `linear-gradient(to right, rgba(${rgbA[0]}, ${rgbA[1]}, ${rgbA[2]}), rgba(${rgbB[0]}, ${rgbB[1]}, ${rgbB[2]}))`
  bg.style.opacity = 0;
}

function init(){
  displayBg();
  setInterval(displayBg, 30000);
}

init();