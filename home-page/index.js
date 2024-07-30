const startBtn = document.querySelector(".startBtn");
const popUpScreen = document.querySelector(".popUpScreen");
const cancelBtn = document.querySelector(".cancelBtn");
const internationalCancelBtn = document.querySelector(
  ".internationalCancelBtn"
);
const alertContainer = document.querySelector(".alertContainer");
const paymentMethodCard = document.querySelector(".paymentMethodCard");
const popUpCard = document.querySelector(".popUpCard");
const internationalCard = document.querySelector(".internationalCard");
const alertText = document.querySelector(".alertText");

const alertYesBtn = document.getElementById("alertYesBtn");
const alertNoBtn = document.getElementById("alertNoBtn");
const countdown = document.getElementById("countdown");
const countdownInt = document.getElementById("countdownInt");
const paymentMethodCancelBtn = document.getElementById(
  "paymentMethodCancelBtn"
);
const localBtn = document.getElementById("localBtn");
const internationalBtn = document.getElementById("internationalBtn");

let timer;
let time = 30; // seconds

function startTimer() {
  if (!timer) {
    timer = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  if (time > 0) {
    time--;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    countdown.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    countdownInt.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    clearInterval(timer);
    timer = null;
    alertContainer.style.display = "none";
    popUpScreen.style.display = "none";
    popUpCard.style.display = "none";
    internationalCard.style.display = "none";
    paymentMethodCard.style.display = "flex";
    resetTimer();
  }
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  time = 30; // Reset time to seconds
  countdown.innerText = "00:00";
  countdownInt.innerText = "00:00";
}

startBtn.addEventListener("click", () => {
  popUpScreen.style.display = "flex";
});

paymentMethodCancelBtn.addEventListener("click", () => {
  popUpScreen.style.display = "none";
});

localBtn.addEventListener("click", () => {
  paymentMethodCard.style.display = "none";
  popUpCard.style.display = "flex";
  startTimer();
});

internationalBtn.addEventListener("click", () => {
  paymentMethodCard.style.display = "none";
  internationalCard.style.display = "flex";
  startTimer();
});

cancelBtn.addEventListener("click", () => {
  alertContainer.style.display = "flex";
  alertText.textContent = "Apakah anda yakin untuk membatalkan pembayaran ?";
  alertYesBtn.textContent = "IYA";
  alertNoBtn.textContent = "TIDAK";
});

internationalCancelBtn.addEventListener("click", () => {
  alertContainer.style.display = "flex";
  alertText.textContent = "Are you sure you want to cancel the payment?";
  alertYesBtn.textContent = "YES";
  alertNoBtn.textContent = "NO";
});

alertYesBtn.addEventListener("click", () => {
  alertContainer.style.display = "none";
  popUpScreen.style.display = "none";
  popUpCard.style.display = "none";
  internationalCard.style.display = "none";
  paymentMethodCard.style.display = "flex";
  resetTimer();
});

alertNoBtn.addEventListener("click", () => {
  alertContainer.style.display = "none";
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "Enter") {
    window.location.href = "../template-page/template.html";
  }
});
