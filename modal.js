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
  CUvalidator: undefined,
};

/**
 * @function
 * @description check input validity in form
 *
 * @returns {boolean} - input validity
 */
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

/**
 * @function
 * @description submit input's event listener
 *
 * @returns {fetch} - users data & close the modal
 */

const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  console.log("submit lancé");
  e.preventDefault();
  e.stopPropagation();

  fieldsValidators(
    "first",
    /^[\wàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\d '-]+$/,
    "firstNameInputValidator",
    "firstnameErrorMessage",
    "Veuillez entrer 2 caractères pour le champs du prénom"
  );
  fieldsValidators(
    "last",
    /^[\wàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\d '-]+$/,
    "lastNameInputValidator",
    "lastnameErrorMessage",
    "Veuillez entrer 2 caractères pour le champs du nom"
  );
  fieldsValidators(
    "email",
    /^[\w\d.+-]+@[\w.-]+\.[a-z]{2,}$/,
    "emailInputValidator",
    "emailErrorMessage",
    "Veuillez saisir une adresse e-mail valide"
  );
  fieldsValidators(
    "birthdate",
    /^\d{4}-\d\d-\d\d$/,
    "birthDateValidator",
    "birthdayErrorMessage",
    "Vous devez entrer une date de naissance"
  );
  fieldsValidators(
    "quantity",
    /^\d{1,2}$/,
    "tournamentAssistedValidator",
    "quantityErrorMessage",
    "Vous devez choisir une option"
  );

  if (document.getElementById("checkbox1").checked) {
    inputValidators.CUvalidator = true;
    const errorSpan = document.getElementById("conditionErrorMessage");
    errorSpan.innerText = null;
    // element.setAttribute("style", "border: none;");
  } else {
    inputValidators.CUvalidator = false;
    console.log("unauthorized");
    const errorSpan = document.getElementById("conditionErrorMessage");
    errorSpan.innerText = "veuillez accepter les conditions";
    // element.setAttribute("style", "border:2px solid red;");
  }

  if (document.querySelector('[name="location"]:checked')) {
    const errorSpan = document.getElementById("locationErrorMessage");
    errorSpan.innerText = null;
    // element.setAttribute("style", "border: none;");
  } else {
    console.log("unauthorized");
    const errorSpan = document.getElementById("locationErrorMessage");
    errorSpan.innerText = "veuillez sélectionner une ville";
    // element.setAttribute("style", "border:2px solid red;");
  }

  console.log(inputValidators);

  const validation = Object.values(inputValidators).every(
    (value) => value === true
  );

  if (validation) {
    const data = {
      firstname: document.getElementById("first").value,
      lastName: document.getElementById("last").value,
      email: document.getElementById("email").value,
      birthdate: document.getElementById("birthdate").value,
      tournamentAssisted: document.getElementById("quantity").value,
      tournamentWish: document.querySelector('[name="location"]:checked').value,
      PreventTornament: document.getElementById("checkbox2").value,
    };

    /**
     * @fetch
     * @description send user's data
     *
     * @returns {json} - send data to the api
     */

    // fetch("server  adress", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   //récupération de la réponse
    //   .then(function (res) {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });

    console.log(data);
    const form = document.querySelector(
      "body > main > div.bground > div > div > form"
    );
    form.remove();
    const formBody = document.querySelector(
      "body > main > div.bground > div > div"
    );
    const formMessage = document.createElement("h2");
    formMessage.classList = "formMessage";
    formMessage.innerText = "Merci pour votre inscription";
    const closeFomBtn = document.createElement("button");
    closeFomBtn.className = "closeFomBtn";
    closeFomBtn.innerText = "Fermer";
    closeFomBtn.addEventListener("click", () => {
      closeModal();
    });

    formBody.appendChild(formMessage);
    formBody.appendChild(closeFomBtn);

    formBody.style.height = "80vh";
    formBody.style.display = "flex";
    formBody.position = "relative";
    formBody.style.alignItems = "center";
    formBody.style.justifyContent = "center";
  }
});
