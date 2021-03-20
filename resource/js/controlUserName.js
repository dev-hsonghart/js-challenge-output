const userNameInputForm = document.querySelector(".input-form"),
  inputUserName = document.querySelector(".input-username"),
  currentUserNameBox = document.querySelector(".current-username-container"),
  currentUserName = currentUserNameBox.querySelector(".current-username");

const USER_LS = localStorage.getItem("userName");

function loadUserName(){
  currentUserNameBox.classList.remove("hidden");
  currentUserName.innerText = `${USER_LS} 님!`
}

function displayUserName(userName){
  currentUserNameBox.classList.remove("hidden");
  currentUserName.innerText = `${userName} 님!`
}

function init(){
  if(USER_LS === null){
    userNameInputForm.addEventListener("submit", (e)=>
  {
    e.preventDefault() // userNameInput 이벤트 리스너

    const text = inputUserName.value;
    localStorage.setItem("userName", text);
    displayUserName(text)
    userNameInputForm.remove();
    userNameInputForm.classList.add("none");
    inputUserName.classList.remove("hidden");
  }  
  )  
  } else{
    userNameInputForm.remove();
    userNameInputForm.classList.add("none");
    loadUserName() 
  }
}

init();
