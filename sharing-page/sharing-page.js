const doneBtn = document.getElementById("doneBtn");
const loadingBar = document.getElementById("loadingBar");
const email = document.querySelector(".email");
const loading = document.querySelector(".loading");

let timer = 30;
loading.style.animation = `loading ${timer}s linear forwards`;

const endTime = (time) => {
  setTimeout(function () {
    window.location.href = "../thankyou-page/thankyou-page.html";
  }, time * 1000);
};

loading.addEventListener("animationend", () => {
  window.location.href = "../thankyou-page/thankyou-page.html";
});

doneBtn.addEventListener("click", () => {
  window.location.href = "../thankyou-page/thankyou-page.html";
});

email.addEventListener("click", () => {
  if (loadingBar.classList.contains("loading")) {
    loadingBar.classList.remove("loading");
    loading.style.animation = "none";
  } else {
    loadingBar.classList.add("loading");
    loading.style.animation = `loading ${timer}s linear forwards`;
  }
});
