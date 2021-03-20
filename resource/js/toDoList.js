const toDoInputBox = document.querySelector(".input-container"),
  backlogList = document.querySelector(".todo-list-backlog"),
  iconDelSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="20"
  viewBox="0 0 20 20"
>
  <g class="icon-del" fill="#696969" fill-rule="evenodd">
    <g fill="inherit" fill-rule="nonzero">
      <g>
        <g>
          <path
            d="M37.75 17c.69 0 1.25.551 1.25 1.23 0 .68-.56 1.232-1.25 1.232H36.5v9.846c0 2.039-1.679 3.692-3.75 3.692h-7.5c-2.071 0-3.75-1.653-3.75-3.692v-9.846h-1.25c-.69 0-1.25-.551-1.25-1.231S19.56 17 20.25 17zM34 19.462H24v9.846c0 .68.56 1.23 1.25 1.23h7.5c.69 0 1.25-.55 1.25-1.23v-9.846zM31.667 13c.736 0 1.333.672 1.333 1.5s-.597 1.5-1.333 1.5h-5.334C25.597 16 25 15.328 25 14.5s.597-1.5 1.333-1.5z"
            transform="translate(-580 -625) translate(405 533) translate(156 79)"
          />
        </g>
      </g>
    </g>
  </g>
</svg>`,
iconCheckSvg = `<svg
xmlns="http://www.w3.org/2000/svg"
width="21"
height="15"
viewBox="0 0 21 15"
>
<g class="icon-check" fill="#696969" fill-rule="evenodd">
  <g fill="inherit" fill-rule="nonzero">
    <g>
      <g>
        <g>
          <path
            d="M25.516 30.659c.267.266.653.443 1.04.443.385 0 .772-.177 1.069-.443L38.09 19.646c.594-.592.594-1.509 0-2.1-.594-.592-1.515-.592-2.109 0l-9.426 9.978-5.465-5.472c-.594-.591-1.515-.591-2.109 0-.594.592-.594 1.508 0 2.1l6.535 6.507z"
            transform="translate(-649 -629) translate(405 533) translate(156 79) translate(70)"
          />
        </g>
      </g>
    </g>
  </g>
</g>
</svg>`

const TODO_LS = "todos";

let todos = [];

function saveToDo(){
  localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

function moveItem(){

}

function removeItem(){

}

// 마우스 over / out에 따라 hoverDiv에 hidden 클래스 넣고 빼기
function displayHover(){
  const hover = document.querySelector(".backlog-item--hover");
  if(hover.classList.contains("hidden") === true){
    hover.classList.remove("hidden");
  }
}
function hideHover(){
  const hover = document.querySelector(".backlog-item--hover");
  if(hover.classList.contains("hidden") === false){
    hover.classList.add("hidden");
  }
}

function paintBtn(){
  const btnDel = document.createElement("button"),
  btnDone = document.createElement("button"),
  btnParent = document.querySelector(".backlog-item--hover");
  console.log(btnParent);

  btnParent.appendChild(btnDel);
  btnDel.classList.add("btn-del");
  const del = btnParent.querySelector(".btn-del");
  del.innerHTML = iconDelSvg;

  btnParent.appendChild(btnDone);
  btnDone.classList.add("btn-done");
  const done = btnParent.querySelector(".btn-done");
  done.innerHTML = iconCheckSvg;

  // 버튼 이벤트 넣기

  del.addEventListener("click", removeItem)
  done.addEventListener("click", moveItem)
}

function paintHover(){
  const div = document.createElement("div");

  const backlogItem = backlogList.querySelector(".backlog-item");

  backlogItem.prepend(div);
  div.classList.add("backlog-item--hover", "hidden");

  paintBtn() // hover 안에 버튼 만들기
}

function paintToDo(text){
  const div = document.createElement("div"),
    span = document.createElement("span");

  backlogList.appendChild(div);
  div.classList.add("backlog-item")
  const backlogItem = backlogList.querySelector(".backlog-item");
  
  backlogItem.appendChild(span)
  const toDoText = backlogList.querySelector("span")
  toDoText.innerText = text; // todo item 생성

  paintHover() // hover div 만들기
  
  backlogItem.addEventListener("mouseover" , displayHover)
  backlogItem.addEventListener("mouseout" , hideHover)
}

function displayInputTodo(){
  const input = document.createElement("input"),
  newId = Math.random().toString(36).substr(2, 16);

  toDoInputBox.appendChild(input); // 투두 입력칸 생성 셋팅
  input.classList.add("input-todo");
  input.placeholder = "✍🏻 내용을 입력하세요.";
  input.id = newId;

  toDoInputBox.addEventListener("submit", (e)=>{ // toDoInput 이벤트 리스너
    e.preventDefault();
    const toDoObj = {
      id : newId,
      text : input.value
    }
      todos.push(toDoObj); // todos array로 데이터 보내기
      saveToDo(); // todos array 로컬스토리지에 저장하기
      paintToDo(input.value); // paint todolist
      input.value = ""; // reset input value
    }
  )
}

function init(){
  if(USER_LS !== null){
    displayInputTodo()
  }
}

init();