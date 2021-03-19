const toDoInputBox = document.querySelector(".input-container");

const TODO_LS = "todos";

let todos = [];

function saveToDo(){
  localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

function paintToDo(text){
  const paintList = document.createElement("article"),
    toDoContainer = document.querySelector(".todo-list");

  toDoContainer.appendChild(paintList);
  paintList.innerText = text;
}

function displayInputTodo(){
  const input = document.createElement("input"),
  newId = Math.random().toString(36).substr(2, 16);

  toDoInputBox.appendChild(input);
  input.classList.add("input-todo");
  input.placeholder = "✍🏻 내용을 입력하세요.";
  input.id = newId;

  toDoInputBox.addEventListener("submit", (e)=>{ // toDoInput 이벤트 리스너
    e.preventDefault();
    const toDoObj = {
      id : newId,
      text : input.value
    }
      todos.push(toDoObj);
      saveToDo();
      // paint todolist
      paintToDo(input.value)
      // reset input value
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