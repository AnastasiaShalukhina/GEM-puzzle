import { createElement } from "./Element.js";
import { buttonPause } from "./Regulation.js";
import { buttonShuffle } from "./Regulation.js";

export const moveCount = createElement("div", "move-container__count", "0");
export const watchStopWatch = createElement(
  "div",
  "watch-container__watch",
  "00 : 00" // container for time reflection
);
export let flagPlay = false;

function Calculations() {
  const sectionCalculation = document.querySelector(".calculation");
  const moveContainer = createElement("div", "move-container");
  const stopWatchContainer = createElement("div", "watch-container");
  sectionCalculation.appendChild(moveContainer);
  sectionCalculation.appendChild(stopWatchContainer);
  const moveText = createElement("div", "move-container__text", "Moves:");

  moveContainer.appendChild(moveText);
  moveContainer.appendChild(moveCount);
  const watchText = createElement("div", "watch-container__text", "Time:");

  stopWatchContainer.appendChild(watchText);
  stopWatchContainer.appendChild(watchStopWatch);

  function stopWatch() {
    let [sec, min] = [0, 0];
    let s;
    let m;
    let interval = null;

    buttonPause.addEventListener("click", () => {
      buttonPause.textContent =
        buttonPause.textContent === "Pause" ? "Play" : "Pause";
      if (flagPlay === false) {
        clearInterval(interval);
        interval = setInterval(displayTime, 1000);
        flagPlay = true;
      } else {
        clearInterval(interval);
        flagPlay = false;
      }
    });

    buttonShuffle.addEventListener("click", () => {
      clearInterval(interval);
      sec = 0;
      min = 0;
      watchStopWatch.textContent = "00 : 00";
      flagPlay = false;
      buttonPause.textContent = "Play";
    });

    function displayTime() {
      sec += 1;
      if (sec == 60) {
        sec = 0;
        min++;
      }
      if (sec < 10) {
        s = "0" + sec;
      } else {
        s = sec;
      }
      if (min < 10) {
        m = "0" + min;
      } else {
        m = min;
      }
      watchStopWatch.textContent = `${m} : ${s}`;
    }
  }
  stopWatch();
}
Calculations();
export { Calculations };
