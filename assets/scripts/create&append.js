function createElement(element, newClass, content = "") {
  const newElement = document.createElement(element);
  if (Array.isArray(newClass)) {
    newElement.classList.add(...newClass);
  } else {
    newElement.classList.add(newClass);
  }
  if (content != "") {
    newElement.textContent = content;
  }
  return newElement;
}

function appendElement(element, parentElement) {
  parentElement.append(element);
  return element;
}

export { createElement, appendElement };
