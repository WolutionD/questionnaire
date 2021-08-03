let activeStep = document.querySelector("[data-step].show");

const warning = document.querySelector(".attn-message");

const userName = document.querySelector("#name");
const userSurame = document.querySelector("#surname");
const userEmail = document.querySelector("#email");
const thanks = document.querySelector("#thanks");

const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const newMessage = document.querySelector("#new-message");

prev.addEventListener("click", () => {
  switch (+activeStep.dataset.step) {
    case 2:
      hiddenWarning();
      hideUnit(userSurame);
      hideUnit(prev);
      showUnit(userName);
      break;

    case 3:
      hiddenWarning();
      hideUnit(userEmail);
      showUnit(userSurame);
      break;

    default:
      break;
  }
  updateActiveStep(prev.id);
});

next.addEventListener("click", () => {
  if (ifBlankWarning()) {
    visibleWarning("blank");
    return false;
  } else {
      hiddenWarning();
  }

  switch (+activeStep.dataset.step) {
    case 1:
      hideUnit(userName);
      showUnit(userSurame);
      showUnit(prev);
      break;

    case 2:
      hideUnit(userSurame);
      showUnit(userEmail);
      break;

    case 3:      
      if (ifEmailWarning(activeStep.firstElementChild.value)) {
        hiddenWarning();
      } else {
          visibleWarning("email");
          return false;
      }

      hideUnit(userEmail);
      hideUnit(prev);
      hideUnit(next);
      showUnit(thanks);
      showUnit(newMessage);
      
      clearData();      
      break;

    default:
      break;
  }
  updateActiveStep(next.id);
});

newMessage.addEventListener("click", () => {
  hideUnit(thanks);
  hideUnit(newMessage);
  showUnit(userName);
  showUnit(next);

  updateActiveStep(newMessage.id);
});

userName.addEventListener("keypress", () => {
  hiddenWarning();
});

userSurame.addEventListener("keypress", () => {
  hiddenWarning();
});

userEmail.addEventListener("keypress", () => {
  hiddenWarning();
});

function clearData() {
  userName.value = ""
  userSurame.value = "";
  userEmail.value = "";
}

function hiddenWarning() {
  warning.classList.add("hidden");
  warning.classList.remove("visible");
  activeStep.firstElementChild.classList.remove("problem");
}

function visibleWarning(warningId) {
  warning.classList.remove("hidden");
  warning.classList.add("visible");
  activeStep.firstElementChild.classList.add("problem");

  switch(warningId) {
    case "blank":
      warning.innerHTML = "*поле обязательное для заполнения";
      break;
    
    case "email":
      warning.innerHTML = "*введите корректный email-адрес";
      break;

    default:
      break;
  }
}

function ifBlankWarning() {
  if (activeStep.firstElementChild.value == "") 
    return true;
}

function ifEmailWarning(email) {
  const templateСorrectАddress = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

  if (templateСorrectАddress.test(email)) 
    return true;
  else 
    return false;
}

function hideUnit(unit) {
  unit.parentElement.classList.remove("show");
  unit.parentElement.classList.add("hide");
}

function showUnit(unit) {
  unit.parentElement.classList.remove("hide");
  unit.parentElement.classList.add("show");
}

function updateActiveStep(buttonId) {
  switch(buttonId) {
    case "prev":
      if (activeStep.previousElementSibling) {
        if (activeStep.dataset.step == 3) 
          next.value = "далее";
        
        activeStep = activeStep.previousElementSibling;
      }
      break;
    
    case "next":
      if (activeStep.nextElementSibling) {
        if (activeStep.dataset.step == 2) 
          next.value = "завершить";
        if (activeStep.dataset.step == 3) 
          next.value = "далее";
        
        activeStep = activeStep.nextElementSibling;
      }
      break;
    
    case "new-message":
      activeStep = document.querySelector("[data-step].show");
      break;
    
    default:
      break;
  }
}
