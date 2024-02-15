const Inputcontainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Setting todays date as min value of dateEL
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Update UI
function updateUi() {
  const now = new Date().getTime();

  const distance = countdownValue - now;

  console.log("distance", distance);

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);

  console.log(days, hours, minutes, seconds);

  //   Populate countdown
  countdownElTitle.textContent = `${countdownTitle}`;
  timeElements[0].textContent = `${days}`;
  timeElements[1].textContent = `${hours}`;
  timeElements[2].textContent = `${minutes}`;
  timeElements[3].textContent = `${seconds}`;

  //   Hide InputContainer
  Inputcontainer.hidden = true;
  // Show countdownContainer
  countdownEl.hidden = false;
}

// updateCountdown
function updateCountdown(e) {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  countdownValue = new Date(countdownDate).getTime();
  console.log(countdownDate, countdownTitle);
  console.log("countdown Time:", countdownValue);

  updateUi();
}

countdownForm.addEventListener("submit", updateCountdown);
