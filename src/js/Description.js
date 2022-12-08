import { sectionDescription } from "./Main.js";
import { createElement } from "./Element.js";

export const audio = createElement(
  "audio",
  "audio",
  "This browser doesn't support this formate of audio. Try another browser please"
);

function createDescription() {
  audio.src = "./src/sounds/click.mp3";
  const inputAudio =
    '<form class="audio-form"><input type="radio" id="audioOn" name="audio" value="on" checked> <label for="audioOn">Turn audio On</label> <input type="radio" id="audioOff" name="audio" value="off"> <label for="audioOff">Turn audio Off</label></form>';

  let textContent =
    "To start a game press Shuffle and then Play. During pause and before pressing Play the blocks movement is impossible! Enjoy!";
  let descriptionText = createElement("div", "description__text", textContent);
  sectionDescription.innerHTML = inputAudio;
  sectionDescription.appendChild(descriptionText);
  sectionDescription.appendChild(audio);
}
createDescription();
export { createDescription };
