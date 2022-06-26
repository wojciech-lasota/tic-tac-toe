function hamburgerMenu() {
  let x = document.getElementById("myTopnav");
  let toggle = document.getElementById("toggle");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
  if (toggle.className === "toggle") {
    toggle.className += " responsive";
  } else {
    toggle.className = "toggle";
  }
}
