const body = document.querySelector("body");
const toggle = document.querySelector("#toggle");
const icon = document.querySelector(".icon");
const cloud = document.querySelector(".cloud");
toggle.onclick = () => {
  toggle.classList.toggle("active");
  body.classList.toggle("active");
  icon.classList.toggle("active");
  cloud.classList.toggle("active");
  document.body.toggle("active");
};
