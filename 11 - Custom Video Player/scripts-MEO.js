// get buttons

const video = document.querySelector("video");
const playerCtrls = document.querySelector(".player__controls");
const playButton = playerCtrls.querySelector("button[title='Toggle Play']");
const volume = playerCtrls.querySelector("input[name='volume']");
const playbackRate = playerCtrls.querySelector("input[name='playbackRate']");
const skip10 = playerCtrls.querySelector("button[data-skip='-10']");
const skip25 = playerCtrls.querySelector("button[data-skip='25']");
const progress = playerCtrls.querySelector(".progress");
const progressFilled = playerCtrls.querySelector(".progress__filled");

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  playButton.innerHTML = icon;
}

function handlePlay(event) {
  if (
    event.type === "keypress" &&
    (event.charCode != 32 || event.code != "Space")
  ) {
    return;
  }
  video.paused ? video.play() : video.pause();
}

function handleSlider() {
  switch (this.name) {
    case "volume":
      video.volume = this.value;
      break;
    case "playbackRate":
      video.playbackRate = this.value;
      break;
  }
}

function handleSkip() {
  if (this.innerHTML === "« 10s") video.currentTime -= 10;
  else if (this.innerHTML === "25s »") video.currentTime += 25;
  else console.log(video);
}

function updateProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  console.log(scrubTime);
  video.currentTime = scrubTime;
}

video.addEventListener("timeupdate", updateProgressBar);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("click", handlePlay);
window.addEventListener("keypress", handlePlay);
playButton.addEventListener("click", handlePlay);
volume.addEventListener("mousemove", handleSlider);
playbackRate.addEventListener("mousemove", handleSlider);
[skip10, skip25].forEach(skip => {
  skip.addEventListener("click", handleSkip);
});
progress.addEventListener("click", scrub);
