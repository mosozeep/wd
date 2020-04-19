const icon = document.getElementsByClassName("icon");

function handleIconClick(event){
  const value = event.target.value;
  const box = document.getElementById(`${value}`);

  box.classList.add("show");

}

  Array.from(icon).forEach(icons  => icons.addEventListener("click", handleIconClick));
