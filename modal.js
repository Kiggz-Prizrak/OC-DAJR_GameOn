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

// object wich contains the form's validations
const inputValidators = {
  firstNameInputValidator: undefined,
  lastNameInputValidator: undefined,
  emailInputValidator: undefined,
  birthDateValidator: undefined,
  tournamentAssistedValidator: undefined,
  CUvalidator: undefined // document.getElementById("checkbox1").checked,
};

function fieldsValidators(tag, regex, validator, message, errorMessage) {
  const element = document.getElementById(tag);
  if (regex.test(element.value)) {
    inputValidators[validator] = true;
    const errorSpan = document.getElementById(message);
    errorSpan.innerText = null;
    element.setAttribute("style", "border: none;");
  } else {
    inputValidators[validator] = false;
    console.log("unauthorized");
    const errorSpan = document.getElementById(message);
    errorSpan.innerText = errorMessage;
    element.setAttribute("style", "border:2px solid red;");
  }
}