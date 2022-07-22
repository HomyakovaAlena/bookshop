import { createElement, appendElement } from "./aggregate.js";

function renderCart() {
  const main = document.querySelector(".wrapper");
  const fragment = document.createDocumentFragment();
  const cartField = appendElement(
    createElement("div", ["cartField", "droppable"]),
    fragment
  );
  cartField.id = "cartField";
  const list = appendElement(createElement("ul", "list"), cartField);
  const total = appendElement(
    createElement("div", ["liRow", "total"]),
    cartField
  );
  if (document.title === "Bookshop") {
    const confirmOrder = appendElement(
      createElement("a", ["confirmOrderBtn", "btn"], "Confirm order"),
      cartField
    );
    confirmOrder.href = "form.html";
  }
  main.append(fragment);
}

export { renderCart };
