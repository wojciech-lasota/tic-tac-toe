function hamburgerMenu() {
  let x = document.getElementById("myTopnav");
  let toggle = document.getElementById("toggle");

  if (x.className === "topnav") {
    x.className += " responsive";

    if (toggle.classList.contains("active")) {
      console.log("ma");
    } else {
      console.log("nie ma");
    }
  } else {
    x.className = "topnav";
  }
  if (toggle.className === "toggle") {
    toggle.className += " responsive";
  } else if (toggle.className == "toggle responsive") {
    toggle.className = "toggle";
  } else if (toggle.className === "toggle active") {
    toggle.className += " responsive";
  } else if (toggle.className === "toggle responsive active") {
    toggle.className = "toggle active";
  }
}
