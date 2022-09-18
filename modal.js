function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloser = document.querySelector(
  "body > main > div.bground > div > span"
);

const checkNextEvent = document.getElementById("checkbox2").checked;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// Close modal event
modalCloser.addEventListener("click", closeModal);
// close modal formData
function closeModal() {
  modalbg.style.display = "none";
}
