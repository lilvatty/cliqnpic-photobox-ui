const video = document.getElementById("video");
const captureButton = document.getElementById("captureButton");
const retakeButton = document.getElementById("retakeButton");
const nextButton = document.getElementById("nextButton");
const canvas = document.getElementById("canvas");
const photosDiv = document.getElementById("photos");
const cameraView = document.getElementById("cameraView");
const controls = document.getElementById("controls");
const photo1 = document.getElementById("photo1");
const photo2 = document.getElementById("photo2");
const photo3 = document.getElementById("photo3");
const photo4 = document.getElementById("photo4");
const loading = document.getElementById("loading");
const countdown = document.getElementById("countdown");
const countdownDisplay = document.querySelector(".countdown");

let localMediaStream = null;
let imgUrl = null;
const imgSrc = [];
let num = 0;

let timer;
let time = 6; // seconds

function startTimer() {
  if (!timer) {
    timer = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  if (time > 0) {
    time--;
    countdown.innerText = time;
  } else {
    clearInterval(timer);
    timer = null;
    resetTimer();
  }
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  time = 6; // Reset time to seconds
  countdown.innerText = "";
}

// Function to start the camera and show live view
function startCamera(display) {
  if (imgSrc.length <= 0) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (mediaStream) {
        video.srcObject = mediaStream;
        localMediaStream = mediaStream;
        cameraView.style.display = "flex";
        canvas.style.display = "none";
        captureButton.style.display = display;
        retakeButton.style.display = "none";
        nextButton.style.display = "none";
        controls.style.display = "none";
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });
  } else if (imgSrc.length < 4) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (mediaStream) {
        video.srcObject = mediaStream;
        localMediaStream = mediaStream;
        cameraView.style.display = "flex";
        canvas.style.display = "none";
        captureButton.style.display = "none";
        retakeButton.style.display = "none";
        nextButton.style.display = "none";
        controls.style.display = "none";
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });
    capturePhoto();
  } else {
    controls.style.display = "none";
    loading.style.display = "flex";
    setTimeout(function () {
      window.location.href = "../filter-page/filter-page.html";
    }, 3000);
  }
}

// Function to capture photo
function capturePhoto() {
  startTimer();
  countdownDisplay.style.display = "flex";
  captureButton.style.display = "none";

  setTimeout(function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    imgUrl = canvas.toDataURL("image/png");
    imgSrc.push(imgUrl);

    // Show captured image preview
    cameraView.style.display = "none";
    canvas.style.display = "block";
    countdownDisplay.style.display = "none";
    retakeButton.style.display = "inline-block";
    nextButton.style.display = "inline-block";
    controls.style.display = "flex";
  }, time * 1000);
}

// Function to retake photo
function retakePhoto() {
  setTimeout(function () {
    imgSrc.pop();
    startCamera("none");
    capturePhoto();
  }, 1000);
}

// Function to proceed to take another photo or save the current photo
function nextPhoto() {
  // Create image element
  if (imgSrc.length <= 4) {
    if (!photo1.src) {
      photo1.src = imgSrc[0];
    } else if (!photo2.src) {
      photo2.src = imgSrc[1];
    } else if (!photo3.src) {
      photo3.src = imgSrc[2];
    } else if (!photo4.src) {
      photo4.src = imgSrc[3];
    }
    // Reset imgUrl and restart camera
    imgUrl = null;
    setTimeout(function () {
      startCamera();
    }, 1000);
  }
}

// Event listeners
captureButton.addEventListener("click", capturePhoto);
retakeButton.addEventListener("click", retakePhoto);
nextButton.addEventListener("click", nextPhoto);

// Initial start
startCamera("block");

//window.location.href = '../start-photo/start-photo.html'
