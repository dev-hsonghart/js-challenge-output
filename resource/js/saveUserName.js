const inputContainer = document.querySelector(".input-container");

const USER_LS = localStorage.getItem("userName");


function saveName(e){
  const inputKey = e.key,
  inputUserName = inputContainer.querySelector(".input-username"),
  inputText = inputUserName.value;
    
  if(inputKey === "Enter"){
    // 팝업 생성
    // 로컬스토리지에 저장
    localStorage.setItem("userName", inputText)
  }
  
}

function loadUserName(){
  const displayInputName = document.createElement("input");

  if(USER_LS === null){// 입력칸 만들기
    inputContainer.appendChild(displayInputName);
    displayInputName.classList.add("input-username")
    displayInputName.placeholder = "👀 당신을 뭐라고 부를까요?"
    
    const inputUserName = inputContainer.querySelector(".input-username");
    inputUserName.addEventListener("keydown", saveName)
  }
}


function init(){
  loadUserName();
}

init();
