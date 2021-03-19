const toDoInputBox = document.querySelector(".input-container");

const TODO_LS = "todos";

let todos = [];

function saveToDo(){
  localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

function displayInputTodo(){
  const input = document.createElement("input")
  toDoInputBox.appendChild(input);
  input.classList.add("input-todo");
  input.placeholder = "✍🏻 내용을 입력하세요.";

  const inputToDo = toDoInputBox.querySelector(".input-todo");
  
  toDoInputBox.addEventListener("submit", (e)=>{ // toDoInput 이벤트 리스너
    e.preventDefault();
      todos.push(input.value);
      saveToDo();
      input.value = "";
    }
  )
}

function init(){
  if(USER_LS !== null){
    displayInputTodo()
  }
}

init();