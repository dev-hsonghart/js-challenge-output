const inputContainer = document.querySelector(".input-container"),
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

function paintInputName(){
  const input = document.createElement("input")
  inputContainer.appendChild(input);
  input.classList.add("input-username");
  input.placeholder = "👀 당신을 뭐라고 부를까요?"
  const inputUserName = inputContainer.querySelector(".input-username");
  
  inputUserName.addEventListener("keydown", (e)=>{ // userNameInput 이벤트 리스너
    const eKey = e.key
    if(eKey === "Enter"){
      localStorage.setItem("userName", input.value);
      inputContainer.removeChild(input);
      displayUserName(input.value)
    }
  })
}

function init(){
  if(USER_LS === null){
    paintInputName();
  } else{
    loadUserName() 
  }
}

init();
