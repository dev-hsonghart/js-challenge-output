const bg = document.querySelector(".background-container");
  

function getRandomNum(){
  const number = Math.floor(Math.random() * 4);
  return number;
}

function paintImg(num){
  const image = new Image();
  image.src = `images/img/0${num + 1}.jpg`;
  bg.appendChild(image)
  image.classList.add("background-img");
  
}

function init(){
  const randomNum = getRandomNum();
  paintImg(randomNum);
}

init()