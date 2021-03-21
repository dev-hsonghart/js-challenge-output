// 1. 사용자 이름 입력은 로컬스토리지에 사용자 이름 값이 없을 때만 가능하다.
// 2. 사용자 이름 입력 칸에 이벤트 리스너를 추가한다.
// 3. 사용자 이름이 입력되면 입력 칸은 none 클래스가 추가한다.
// 4. 사용자 이름 입력값은 로컬스토리지에 저장한다.
// 5. 사용자 이름 입력값을 username html에 뿌리고, 해당 html은 hidden 클래스를 제거한다.
// 6. 투두리스트 입력칸에 hidden 클래스를 제거한다.

const userNameInputForm = document.querySelector(".input-form-username"),
  userNameInput = userNameInputForm.querySelector("input"),
  currentUserNameBox = document.querySelector(".current-username-container"),
  currentUserName = currentUserNameBox.querySelector(".current-username");

const USER_LS = localStorage.getItem("userName");

function displayUserName(userName){
  currentUserNameBox.classList.remove("hidden");
  currentUserName.innerText = `${userName} 님!`;
}

function init(){
  const inputToDo = document.querySelector(".input-todo");
  
  if(USER_LS === null){
    userNameInputForm.addEventListener("submit", (e)=>
    {
      e.preventDefault() // userNameInput 이벤트 리스너

      const text = userNameInput.value;
      localStorage.setItem("userName", text);
      displayUserName(text);
      userNameInputForm.remove();
      userNameInputForm.classList.add("none");
      inputToDo.classList.remove("hidden");
      // animation
      currentUserNameBox.style.animation = "fadeIn 1s ease-in forwards";

    }  
  )}
  else{
    userNameInputForm.remove();
    userNameInputForm.classList.add("none");
    displayUserName(USER_LS);
    currentUserNameBox.style.opacity = "1";
  }
}

init();
