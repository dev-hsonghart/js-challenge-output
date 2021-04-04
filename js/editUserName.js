// 1. USER_LS 값이 있을 때만 작동
<<<<<<< Updated upstream
// 2. input.value가 있을 때만 사용자 이름 저장
// 3. input.value 없이 수정하기 버튼을 누르거나 취소 버튼을 누를 경우 팝업 닫기
=======
// 2. input.value가 있을 때만 수정
// 3. input.value가 없이 수정하기 버튼을 누르거나 취소 버튼을 누를 경우 팝업 창 닫기
>>>>>>> Stashed changes

const editUserNameBox = document.querySelector(".current-username-edit"),
  inputUserName = editUserNameBox.querySelector("input"),
  saveUserName = editUserNameBox.querySelector(".current-username-edit__save"),
  cancelUserName = editUserNameBox.querySelector(".current-username-edit__cancel");

function saveValue(e){
  e.stopPropagation();
  if(inputUserName.value !== null){
    const text = inputUserName.value;
    localStorage.setItem("userName", text);
    editUserNameBox.style.display = "none";
    currentUserName.innerText = `${text} 님!`;
  } else{
    editUserNameBox.style.display = "none";
  }
}
  
function closeEditPopup(e){
  e.stopPropagation();
  editUserNameBox.style.display = "none";
}

function printEditPopup(e){
  e.stopPropagation(); // 이벤트 버블링 방지
  editUserNameBox.style.display = "flex";

  printCurrentName();
  cancelUserName.addEventListener("click", closeEditPopup); // 취소 버튼
  saveUserName.addEventListener("click", saveValue); // 저장 버튼
}

function printCurrentName(){
  inputUserName.placeholder = USER_LS;
}
  
function init(){
  if(USER_LS !== null){
    currentUserName.addEventListener("click", printEditPopup);
  }
}

init();