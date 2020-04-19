const greeting = document.querySelector('.js-greeting'),
  welcome = document.querySelector('.js-welcome'),
  greetForm = document.querySelector('.js-greetForm'),
  input = greetForm.querySelector('input');

const intro = document.querySelector('.js-intro'),
  welcomeH2 = document.querySelector('.js-welcomeH2'),
  greetH2 = document.querySelector('.js-greetH2');

const NAME = 'userName';
const userName = localStorage.getItem(NAME);

function saveName(text){
  localStorage.setItem(NAME , text);
}

var i = 0;
var txt = 'What is your name?';
var speed = 100;

function typing1(){
if (i < txt.length) {
   greetH2.innerHTML += txt.charAt(i);
   i++;
   setTimeout(typing1, speed);
 }
}

var txt2 = `Hello, ${userName}. Welcome to the WaveDesk.`;

function typing2(){
  if (i < txt2.length) {
     welcomeH2.innerHTML += txt2.charAt(i);
     i++;
     setTimeout(typing2, speed);
   }
}

function handleSubmit(event) {
  event.preventDefault();
  const value = input.value;
  saveName(value);
  paintIntro(value);
  welcomeH2.innerText = `Hello, ${value}. Welco`;
  typing2();
  setTimeout(hide, 5000);
}

function hide(){
  intro.classList.remove('show');
}
function paintIntro(text){
  greeting.classList.remove('show');
  welcome.classList.add('show');
}

function askUserName(){
  greeting.classList.add('show');
  typing1();
  greetForm.addEventListener('submit',handleSubmit);
}

function loadName(){
  if(userName === null){
    askUserName();
  }else {
    paintIntro(userName);
    typing2();
    setTimeout(hide, 7000);
  }
}

function init(){
  loadName();
}

init();
