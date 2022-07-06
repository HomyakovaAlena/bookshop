function dragAndDrop() {
  let dragObj = "";
  const dragImgs = document.querySelectorAll(".imgBook");
  const cartField = document.querySelector(".cartField");
  const list = document.querySelector(".list");

  function handleDragStart(event) {
    event.stopImmediatePropagation();
    this.style.opacity = "0.4";
    dragObj = event.target;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    elemBelow.style.cursor = "move";
  }

  function handleDragOver(event) {
    console.log("dragOver");
    event.preventDefault();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    console.log("dragEnter");
    this.classList.add("active");
  }

  function handleDragLeave(event) {
    event.preventDefault();
    console.log("dragLeave");
    const isOutside = !event.target.closest(".cartField");
    if (isOutside) {
      this.classList.remove("active");
    }
  }

  function handleDragEnd(event) {
    event.preventDefault();
    console.log("dragEnd");
    this.style.opacity = "1.0";
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!dragObj) {
      cartField.classList.remove("active");
      return false
    }
    const card = dragObj.closest(".card");
    const imgSrc = card.querySelector("img").src;
    const headingTitle = card.querySelector(".headingTitle").textContent;
    const headingAuthor = card.querySelector(".headingAuthor").textContent;
    const headingPrice = card.querySelector(".headingPrice").textContent;

    const item = {
      imgsrc: `${imgSrc.replace("300", "100")}`,
      imgalt: `${headingTitle}`,
      title: `${headingTitle}`,
      author: `${headingAuthor}`,
      price: `${headingPrice}`,
      // id: Date.now(),
      complete: false,
    };
    let items = JSON.parse(localStorage.getItem("items"));
    items.push(item);
    list.dispatchEvent(new CustomEvent("itemsUpdated", { "detail": items }));
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
    handleDrop(event)
  });

}

export { dragAndDrop };
