function createElement(tag, classN, text, id) {
  const element = document.createElement(tag);
  element.className = classN;
  element.textContent = text;
  return element;
}
createElement();

export { createElement };
