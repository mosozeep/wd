const icon = document.getElementsByClassName("icon");
const close = document.getElementsByClassName("close");
const display__btn = document.getElementsByClassName("js-display");
const border__btn = document.getElementById("js-border");
const taskbar__btn = document.getElementsByClassName("js-taskbar__btn");

const modal_display = document.querySelector('.modal--display');
const modal_todo = document.querySelector('.modal--todo');
const modal_paint = document.querySelector('.modal--paint');

function zindex(a){
  if (a == 'modal1') {
    modal_display.style.zIndex = '300';
  }else if (a == 'modal2') {
    modal_display.style.zIndex = '100';
    modal_todo.style.zIndex = '200';
    modal_paint.style.zIndex = '100';
  }else if (a == 'modal3') {
    modal_display.style.zIndex = '100';
    modal_todo.style.zIndex = '100';
    modal_paint.style.zIndex = '200';
  }
}

function handleIconClick(event){
  const value = event.target.value;
  const box = document.getElementById(`${value}`);
  if(!box.classList[1]){
    box.classList.add("show");
  }
  zindex(value);
}

function handleCloseClick(event){
  const value = event.target.value;
  const box = document.getElementById(`${value}`);
  box.classList.remove("show");
}

function handleDisplayClick(event){
  const id = event.target.id;
  let value = event.target.value;
  const show = document.getElementsByClassName(`${id}`);
if (value === "show") {
  Array.from(show).forEach(shows => shows.classList.add("show"));
  event.target.classList.add("display__btn--reverse");
  event.target.value = "hidden";
}else {
  Array.from(show).forEach(shows => shows.classList.remove("show"));
  event.target.classList.remove("display__btn--reverse");
  event.target.value = "show";
}
}

const border = document.getElementsByClassName("js-purple");
const border_reverse = document.getElementsByClassName("js-purple--reverse");

function handleBorderClick(event){
  let value = event.target.value;
  if (value === "purple") {
    Array.from(border).forEach(purple => purple.classList.add("purple"));
    Array.from(border_reverse).forEach(purple => purple.classList.add("purple--reverse"));
    event.target.classList.add("display__btn--reverse");
    event.target.value ="gray";
  }else {
    Array.from(border).forEach(purple => purple.classList.remove("purple"));
    Array.from(border_reverse).forEach(purple => purple.classList.remove("purple--reverse"));
    event.target.classList.remove("display__btn--reverse");
    event.target.value ="purple";
  }
}

function handleTaskbarClick(event){
  const value = event.target.value;
  const box = document.getElementById(`${value}`);
  if(!box.classList[1]){
    box.classList.add("show");
  }
  zindex(value);
  const class1 = event.target.classList[2];
  const mode = border__btn.value;
  Array.from(taskbar__btn).forEach(i=> {
    if( mode === "purple" ){
      i.classList.remove('border--reverse', 'js-purple--reverse');
      i.classList.add('border', 'js-purple');
      if(class1 == 'border'){
        event.target.classList.remove('border', 'js-purple');
        event.target.classList.add('border--reverse', 'js-purple--reverse');
      }else {
        event.target.classList.remove('border--reverse', 'js-purple--reverse');
        event.target.classList.add('border', 'js-purple');
      }
    }else if (mode === "gray") {
      i.classList.remove('border--reverse', 'js-purple--reverse', 'purple--reverse');
      i.classList.add('border', 'js-purple','purple');
      if(class1 == 'border'){
        event.target.classList.remove('border', 'js-purple','purple');
        event.target.classList.add('border--reverse', 'js-purple--reverse','purple--reverse');
      }else {
        event.target.classList.remove('border--reverse', 'js-purple--reverse','purple--reverse');
        event.target.classList.add('border', 'js-purple','purple');
      }
    }
  });

}

  Array.from(icon).forEach(icons  => icons.addEventListener("click", handleIconClick));

  Array.from(close).forEach(btn => btn.addEventListener("click", handleCloseClick));

  Array.from(display__btn).forEach(btn => btn.addEventListener("click",handleDisplayClick));

  Array.from(taskbar__btn).forEach(btn =>
  btn.addEventListener("click",handleTaskbarClick));

  border__btn.addEventListener("click",handleBorderClick);
