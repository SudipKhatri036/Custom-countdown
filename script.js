const inputcontainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Setting todays date as min value of dateEL
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Update UI
function updateUi() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();

    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //   Hide InputContainer
    inputcontainer.hidden = true;

    if (distance < 0) {
      // Show complete Container
      countdownEl.hidden = true;
      completeEl.hidden = false;
      clearInterval(countdownActive);
      completeInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
    } else {
      //   Populate countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      // Show countdownContainer
      countdownEl.hidden = false;
      completeEl.hidden = true;
    }
  }, second);
}

// updateCountdown
function updateCountdown(e) {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  if (countdownDate === "") {
    alert("Please enter a date for countdown");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateUi();
  }
}

// Showprevious countdown

function showPreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    inputcontainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateUi();
  }
}

// Reset countdown
function reset() {
  // Show input container and hide countdown container
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputcontainer.hidden = false;
  // Stop countdown
  clearInterval(countdownActive);
  // reset values
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// On load
showPreviousCountdown();
