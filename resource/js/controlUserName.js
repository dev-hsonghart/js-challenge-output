const userNameInputForm = document.querySelector(".input-form-username"),
  inputUserName = document.querySelector(".input-username"),
  currentUserNameBox = document.querySelector(".current-username-container"),
  currentUserName = currentUserNameBox.querySelector(".current-username");

const USER_LS = localStorage.getItem("userName");

function displayUserName(userName){
  currentUserNameBox.classList.remove("hidden");
  currentUserName.innerText = `${userName} 님!`
}

function init(){
  const inputToDo = document.querySelector(".input-todo")
  if(USER_LS === null){
    userNameInputForm.addEventListener("submit", (e)=>
  {
    e.preventDefault() // userNameInput 이벤트 리스너

    const text = inputUserName.value;
    localStorage.setItem("userName", text);
    displayUserName(text)
    userNameInputForm.remove();
    userNameInputForm.classList.add("none");
    inputToDo.classList.remove("hidden");
  }  
  )  
  } else{
    userNameInputForm.remove();
    userNameInputForm.classList.add("none");
    displayUserName(USER_LS)
  }
}

init();
