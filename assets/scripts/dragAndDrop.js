import { pushItemToCart } from "./aggregate.js";

function dragAndDrop() {
  let dragObj = "";
  const dragImgs = document.querySelectorAll(".imgBook");
  const cartField = document.querySelector(".cartField");

  function handleDragStart(event) {
    event.stopImmediatePropagation();
    this.classList.add("low-opacity");

    dragObj = event.target;
    const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    elemBelow.classList.add("cursor-move");
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    this.classList.add("active");
  }

  function handleDragLeave(event) {
    event.preventDefault();
    const isOutside = !event.target.closest(".cartField");
    if (isOutside) {
      this.classList.remove("active");
    }
  }

  function handleDragEnd(event) {
    event.preventDefault();
    this.classList.remove("low-opacity");
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!dragObj) {
      cartField.classList.remove("active");
      return false;
    }
    pushItemToCart(dragObj);
    dragObj = "";
    cartField.classList.remove("active");
  }

  dragImgs.forEach((dragImg) =>
    dragImg.addEventListener("dragstart", handleDragStart)
  );
  cartField.addEventListener("dragover", handleDragOver);
  cartField.addEventListener("dragenter", handleDragEnter);
  cartField.addEventListener("dragleave", handleDragLeave);
  dragImgs.forEach((dragImg) =>
    dragImg.addEventListener("dragend", handleDragEnd)
  );
  cartField.addEventListener("drop", (event) => {
    handleDrop(event);
  });
}

export { dragAndDrop };
