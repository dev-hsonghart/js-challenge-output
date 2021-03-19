const inputContainer = document.querySelector(".input-container"),
  currentUserNameBox = document.querySelector(".current-username-container"),
  currentUserName = currentUserNameBox.querySelector(".current-username");

const USER_LS = localStorage.getItem("userName");

function loadUserName(){
  currentUserNameBox.classList.remove("hidden");
  currentUserName.innerText = `${USER_LS} 님!`
}

function paintToDo(){ // 투두입력 추가
  const input = document.createElement("input")
  inputContainer.appendChild(input);
  input.classList.add("input-todo");
  input.placeholder = "✍🏻 내용을 입력하세요.";
}

function displayUserName(userName){
  currentUserNameBox.classList.remove("hidden");
  currentUserName.innerText = `${userName} 님!`
}

function paintInputName(){
  const input = document.createElement("input")
  inputContainer.appendChild(input);
  input.classList.add("input-username");
  input.placeholder = "👀 당신을 뭐라고 부를까요?";
  input.maxLength = 10;
  
  inputContainer.addEventListener("submit", (e)=>
  {
    e.preventDefault() // userNameInput 이벤트 리스너
    localStorage.setItem("userName", input.value);
    inputContainer.removeChild(input);
    displayUserName(input.value)
    paintToDo()
  }  
  )
}

function init(){
  if(USER_LS === null){
    paintInputName();
  } else{
    loadUserName() 
  }
}

init();
