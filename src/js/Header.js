import { createElement } from "./Element.js";
export const body = document.getElementsByTagName("body");
export const header = createElement("header", "header");
export const modalCongratulation = createElement("div", "modal-congratulation");

function createHeader() {
  const wrapper = createElement("div", "wrapper");
  body[0].prepend(header);
  body[0].prepend(modalCongratulation);
  header.prepend(wrapper);
  const headerGreeting = createElement(
    "div",
    "header__greeting",
    "Hi! Welcome to the GEM-PUZZLE!"
  );
  wrapper.prepend(headerGreeting);
}
createHeader();
export { createHeader };
