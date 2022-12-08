import { createElement } from "./Element.js";
import { body } from "./Header.js";
import { header } from "./Header.js";

export const wrapperMain = createElement("div", "wrapper");
export const sectionGameField = createElement("div", "game-field");
export const sectionDescription = createElement("div", "description");

function createSections() {
  const main = createElement("main", "main");
  body[0].insertBefore(main, header.nextSibling);
  main.appendChild(wrapperMain);
  let arrSections = [];
  const sectionRegulaion = createElement("div", "regulation");
  arrSections.push(sectionRegulaion);
  const sectionCalculation = createElement("div", "calculation");
  arrSections.push(sectionCalculation);
  arrSections.push(sectionGameField);
  arrSections.push(sectionDescription);

  for (let i = 0; i < arrSections.length; i++) {
    arrSections[i].classList.add("section");
    wrapperMain.appendChild(arrSections[i]);
  }
}
createSections();

export { createSections };
