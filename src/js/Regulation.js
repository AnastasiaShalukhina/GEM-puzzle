import { createElement } from "./Element.js";
export const buttonPause = createElement("button", "pause", "Play");
export const buttonSave = createElement("button", "save", "Save");
export const buttonShuffle = createElement("button", "shuffle", "Shuffle");
export const buttonResults = createElement("button", "results", "Results");

function createRegulation() {
  let arrButtons = [];
  let sectionRegulation = document.querySelector(".regulation");
  arrButtons.push(buttonShuffle);
  arrButtons.push(buttonPause);
  arrButtons.push(buttonSave);
  arrButtons.push(buttonResults);
  for (let i = 0; i < arrButtons.length; i++) {
    arrButtons[i].classList.add("button");
    sectionRegulation.appendChild(arrButtons[i]);
  }
}

createRegulation();
export { createRegulation };
