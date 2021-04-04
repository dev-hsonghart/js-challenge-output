// 0. 투두리스트 입력칸은 사용자 이름이 로컬스토리지에 있을 때만 나타난다.
// 1. 투두리스트 입력 시 입력값을 html에 뿌린다.
// 2. 투두리스트 아이템(=backlogItem)은 삭제버튼과 체크버튼을 갖는다.
// 3. backlogItem의 삭제버튼은 아이템을 삭제한다.
// 4. backlogItem의 체크버튼은 아이템을 donelist로 옮긴다.
// 5. DONE 아이템은 삭제버튼만 있다.
// 6. 로컬스토리지에 backlog와 done의 아이템이 각각 저장된다.
// 7. 새로고침 시 로컬스토리지 데이터를 불러와 html로 뿌린다.

const sectionToDoList = document.querySelector(".todo-list"),
  toDoInputBox = document.querySelector(".input-form-todo"),
  backlogList = document.querySelector(".todo-list-backlog"),
  doneList = document.querySelector(".todo-list-done"),
  iconDelSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g class="icon-del" transform="translate(-605.000000, -551.000000)" fill="#a4a4a4" fill-rule="nonzero">
              <path d="M615.27832,552.048233 L611.995,555.332 L608.712435,552.048986 C607.977246,551.313797 606.784237,551.313797 606.045909,552.048986 L605.930165,552.175624 C605.312864,552.915506 605.351445,554.01874 606.045909,554.713204 L609.331,557.997 L606.048216,561.280642 C605.312902,562.015957 605.312902,563.209546 606.048216,563.94486 C606.406325,564.302969 606.883961,564.4975 607.380326,564.4975 L607.544948,564.490338 C607.981356,564.452251 608.394116,564.263179 608.712435,563.94486 L611.996,560.661 L615.279873,563.94486 C615.637982,564.302969 616.115618,564.4975 616.611982,564.4975 C617.108347,564.4975 617.585983,564.302969 617.944091,563.94486 L618.059835,563.818222 C618.677136,563.07834 618.638555,561.975106 617.944091,561.280642 L614.66,557.997 L617.944091,554.713204 C618.679405,553.97789 618.679405,552.7843 617.944091,552.048986 C617.208903,551.313797 616.015894,551.313797 615.27832,552.048233 Z" id="icon-del"></path>
          </g>
      </g>
  </svg>`,
  iconCheckSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10">
  <g fill="none" fill-rule="evenodd">
      <g class="icon-check "fill="#fff" fill-rule="nonzero">
          <g>
              <path d="M9.843 16.683c.19.19.467.317.743.317.275 0 .551-.127.763-.317l7.476-7.866c.424-.423.424-1.078 0-1.5-.425-.423-1.082-.423-1.507 0l-6.732 7.127-3.904-3.908c-.425-.423-1.082-.423-1.507 0-.424.422-.424 1.077 0 1.5l4.668 4.647z" transform="translate(-643 -553) translate(639 546)"/>
          </g>
      </g>
  </g>
  </svg>`,
  iconCheckedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="107" height="107" viewBox="0 0 107 107">
  <g fill="none" fill-opacity=".15" fill-rule="evenodd">
      <g fill="#00750C" fill-rule="nonzero">
          <path d="M1262.5 533c-29.487 0-53.5 24.013-53.5 53.5s24.013 53.5 53.5 53.5 53.5-24.013 53.5-53.5-24.013-53.5-53.5-53.5zm-7.672 78L1231 587.127l7.111-7.087 16.842 16.785L1287.89 564l7.111 7.087L1254.828 611z" transform="translate(-1209 -533)"/>
      </g>
  </g>
</svg>
`

const TODO_LS = "todos",
  DONE_LS = "done";

let todos = [],
  dones = [];

function saveToDo(){
  localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

function saveDone(){
  localStorage.setItem(DONE_LS, JSON.stringify(dones));
}

function loadTodos(){
  const toDoData = localStorage.getItem(TODO_LS);
    if(toDoData !== null){
        const pasredToDos = JSON.parse(toDoData);
        pasredToDos.forEach(data => {
            paintToDo(data.text)
        })
    }
}

function loadDones(){
  const doneData = localStorage.getItem(DONE_LS);
  if(doneData !== null){
      const pasredDones = JSON.parse(doneData);
      pasredDones.forEach(data => {
          paintDone(data.text)
      })
  }
}

function moveItem(){
  const backlogItem = backlogList.querySelector(".backlog-item"),
    text = backlogItem.querySelector("span"),
    btnDone = backlogItem.querySelector(".btn-done");

  // 타겟의 backlogItem을 doneList에 prepend한다.
  doneList.prepend(backlogItem);
  backlogItem.className = "done-item" // 클래스 바꾸기
  btnDone.remove()

  const cleanToDos = todos.filter(function(task){ // todos배열에 아래 조건에 맞는 것들을 모은다.
    return task.id !== backlogItem.id; // 매개변수의 아이디와 해당대상의 아이디가 다른 것들만 추리고 갖고 있는다.
  })
  todos = cleanToDos; // 투두스의 배열은 위에서 추린 배열과 같다.
  saveToDo(); // 투두스 로컬스토리지 업데이트

  // 로컬스토리지 dones에 보내기
  const doneObj = {
    id : backlogItem.id,
    text : text.innerText
  }

  dones.push(doneObj);
  saveDone();
}

function removeAllItem(e){
  e.preventDefault();

  const backlogItems = backlogList.querySelectorAll(".backlog-item");
  for(let i = 0; i < backlogItems.length; i++){
    backlogItems[i].remove();
    const cleanToDos = todos.filter(function(task){ // todos배열에 아래 조건에 맞는 것들을 모은다.
      return task.id !== backlogItems[i].id; // 매개변수의 아이디와 해당대상의 아이디가 다른것들만 추리고 갖고 있는다.
      }
    )
    todos = cleanToDos; 
  }
  saveToDo();
  
  allDel = sectionToDoList.querySelector(".btn-all-del");
  allDel.remove();
}

function removeItem(e){
  const eClass = e.target.className,
    parent = e.target.parentNode;
  // backlogItem 지우기
  
  if(eClass === "btn-del" && parent.className === "backlog-item"){ 
    // 로컬스토리지에서 타겟 id를 찾아 지운다.
    const cleanToDos = todos.filter(function(task){ // todos배열에 아래 조건에 맞는 것들을 모은다.
      return task.id !== parent.id; // 매개변수의 아이디와 해당대상의 아이디가 다른것들만 추리고 갖고 있는다.
      }
    )

    parent.remove();
    todos = cleanToDos; // 투두스의 배열은 위에서 추린 배열과 같다.
    saveToDo(); // 달라진 투두스의 배열을 기존 스토리지에 덮어씌운다.
  }

  // todoItem 지우기
  else if(eClass === "btn-del" && parent.className === "done-item"){
    const cleanDones = dones.filter(function(task){
      return task.id !== parent.id;
    })

    parent.remove();
    dones = cleanDones;
    saveDone();
  }
}

function paintToDo(text){
  const div = document.createElement("div"),
    span = document.createElement("span"),
    btnDel = document.createElement("button"),
    btnDone = document.createElement("button"),
    btnAllDel = document.createElement("button"),
    newId = Math.random().toString(36).substr(2, 16);

  backlogList.prepend(div);
  div.classList.add("backlog-item");
  const backlogItem = backlogList.querySelector(".backlog-item");
  
  backlogItem.appendChild(span);
  const toDoText = backlogList.querySelector("span");
    toDoText.innerText = text; // todo item 생성

  backlogItem.appendChild(btnDone);
  btnDone.classList.add("btn-done");
  const done = backlogItem.querySelector(".btn-done");
    done.innerHTML = iconCheckSvg;
    done.addEventListener("click", moveItem);

  backlogItem.appendChild(btnDel);
  btnDel.classList.add("btn-del");
  const del = backlogItem.querySelector(".btn-del");
    del.innerHTML = iconDelSvg;
    del.addEventListener("click", removeItem);
  
  if(backlogList.children.length === 1){
    sectionToDoList.prepend(btnAllDel);
    btnAllDel.classList.add("btn-all-del");
    const allDel = sectionToDoList.querySelector(".btn-all-del");
    allDel.innerText = "전체 삭제";
    allDel.addEventListener("click", removeAllItem);
  }

  // 애니메이션 생성
  backlogItem.style.animation = "fadeIn 1.3s forwards"

  backlogItem.id = newId;
  const toDoObj = {
    id : newId,
    text : text
  }

  todos.push(toDoObj); // todos array로 데이터 보내기
  saveToDo(); // todos array 로컬스토리지에 저장하기
}

function paintDone(text){ // 로컬스토리지 DONE에 있는 데이터를 donslist에 뿌리기
  const div = document.createElement("div"),
    span = document.createElement("span"),
    btnDel = document.createElement("button"),
    newId = Math.random().toString(36).substr(2, 16);

  doneList.prepend(div);
  div.classList.add("done-item");
  const doneItem = doneList.querySelector(".done-item");
  
  doneItem.appendChild(span);
  const doneText = doneList.querySelector("span");
    doneText.innerText = text; // todo item 생성

  doneItem.appendChild(btnDel);
  btnDel.classList.add("btn-del");
  const del = doneItem.querySelector(".btn-del");
    del.innerHTML = iconDelSvg;
    del.addEventListener("click", removeItem);

  doneItem.style.animation = "fadeIn 1.3s forwards"

  doneItem.id = newId;
  const doneObj = {
    id : newId,
    text : text
  }

  dones.push(doneObj); // done array로 데이터 보내기
    saveDone(); // done array 로컬스토리지에 저장하기
}

function init(){
  const toDoForm = document.querySelector(".input-todo");
      
  toDoInputBox.addEventListener("submit", (e)=>{ // toDoInput 이벤트 리스너
    e.preventDefault();
    paintToDo(toDoForm.value); // paint todolist
    toDoForm.value = ""; // reset input value
  }
  )
  if(USER_LS !== null){
    toDoForm.classList.remove("hidden"); // todoinput 항시 표시
    loadTodos();
    loadDones();
  }

}

init();