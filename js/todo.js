const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList');
  const delAll = document.querySelector('.js-delAll'),
    toDoLi = document.getElementsByClassName('js-toDoLi');

const TODOS_LS = 'toDo';
const DECO_LS = 'deCo'
const NONE = 'none';
const DECO = 'line-through';
const COM = 'COMPLETE';
const INCOM = 'INCOMPLETE';

let deCo = [];
let toDo = [];

// const local = localStorage.getItem(TODOS_LS);
// let parse = JSON.parse(local);
//
// if(local === "null"){
//   localStorage.removeItem(TODOS_LS);
// }

function comToDo(event){
  const btn = event.target;
  const li = event.target.parentNode;
  const id = li.id;
  const num = id - 1;
  const span = li.querySelector('span');
  const load = localStorage.getItem(DECO_LS);
  let parsed = JSON.parse(load);
  let newToDo = parsed[num];
  if(newToDo.deco === NONE){
    newToDo.deco = DECO;
    newToDo.com = INCOM;
  } else if (newToDo.deco === DECO) {
    newToDo.deco = NONE;
    newToDo.com = COM;
  }
  parsed.splice(num,1,newToDo);
  localStorage.setItem(DECO_LS,JSON.stringify(parsed));
  btn.innerText = newToDo.com;
  span.style.textDecoration = newToDo.deco;
}

function delToDo(event) {
  const li = event.target.parentNode;
  const id = li.id;
  const index = id -1 ;
  toDoList.removeChild(li);
  const cleanToDos = toDo.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDo = cleanToDos;
  saveToDos();
  const a = localStorage.getItem(DECO_LS);
  let b = JSON.parse(a);
  b.splice(index,1);
  localStorage.setItem(DECO_LS,JSON.stringify(b));
}

function delAllToDo(){
  Array.from(toDoLi).forEach(i=>{
    toDoList.removeChild(i);
  });
  localStorage.removeItem(TODOS_LS);
  localStorage.removeItem(DECO_LS);
  delAll.innerText = '';
}

function saveDeCo(){
  localStorage.setItem(DECO_LS, JSON.stringify(deCo));
}
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDo));
}
function paintDeco(){
  Array.from(toDoLi).forEach(i=>{
    const id = i.id;
    const num = id-1;
    const span = i.querySelector('span');
    const com = i.querySelector('btn');
    const load = localStorage.getItem(DECO_LS);
    const parse = JSON.parse(load);
    const newToDo = parse[num];
    span.style.textDecoration = newToDo.deco;
    com.innerText = newToDo.com;
  });
}

function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('a');
  const comBtn = document.createElement('btn');
  li.classList.add('js-toDoLi');
  delBtn.innerText = 'DELETE';
  delBtn.addEventListener('click',delToDo);
  comBtn.innerText = 'COMPLETE';
  comBtn.addEventListener('click',comToDo);
  delAll.innerText = 'DELETE ALL';
  delAll.addEventListener('click',delAllToDo);

  const span = document.createElement('span');
  const newId = toDo.length + 1;
  span.innerText = text;
  li.appendChild(span);
  li.id = newId;
  li.appendChild(delBtn);
  li.appendChild(comBtn);
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id : newId
  };
  toDo.push(toDoObj);
  saveToDos();
}

function newDeco(){
  const deCoObj = {
    deco : NONE,
    com : COM
  }
  const a = localStorage.getItem(DECO_LS);
  let b = JSON.parse(a);
  if(a===null){
    deCo = [];
  }else {
    deCo = b;
  }
  deCo.push(deCoObj);
  saveDeCo();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
  newDeco();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
  paintDeco();
}


function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
