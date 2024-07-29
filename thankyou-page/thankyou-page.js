const video = document.getElementById("video");

video.addEventListener("ended", () => {
  window.location.href = "../home-page/index.html";
});
