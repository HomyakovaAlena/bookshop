import { create, main } from "./aggregate.js";

function cart() {
  const fragment = document.createDocumentFragment();
  const cartField = create("div", "cartField", fragment, "");
  cartField.id = "cartField";
  cartField.classList.add("droppable");
  const list = create("ul", "list", cartField);
  const total = create("div", "liRow", cartField);
  total.classList.add("total");
  if (document.title === "Bookshop") {
    const confirmOrder = create(
      "a",
      "confirmOrderBtn",
      cartField,
      "Confirm order"
    );
    confirmOrder.classList.add("btn");
    confirmOrder.href = "form.html";
  }

  main.append(fragment);
}

function addToCart() {
  const buttonsAdd = document.querySelectorAll(".btnAdd");
  const list = document.querySelector(".list");

  buttonsAdd.forEach((button) =>
    button.addEventListener("click", (event) => {
      handleClick(event);
    })
  );

  function handleClick(event) {
    event.stopPropagation();
    const button = event.currentTarget;
    pushItem(button);
  }
  list.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
      deleteItem(e);
    }
  });

  list.addEventListener("itemsUpdated", mirrorToLocalStorage);
  list.addEventListener("itemsUpdated", displayItems);
  list.addEventListener("itemsUpdated", displayTotal);
  list.addEventListener("itemsUpdated", disableConfirmBtn);
  restoreFromLocalStorage();
}

function pushItem(button) {
  const list = document.querySelector(".list");
  const card = button.closest(".card");
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
  };
  let items = JSON.parse(localStorage.getItem("items"));
  items.push(item);
  list.dispatchEvent(new CustomEvent("itemsUpdated", { detail: items }));
}

function displayItems(event) {
  let items = JSON.parse(localStorage.getItem("items"));
  items = removeDuplicates(event);
  const list = document.querySelector(".list");

  const html = items
    .map(
      (item) => `<li class='liRow booksInCart'>
                <img class='imgBookCart' src="${item.imgsrc}" alt="${
        item.title
      }" />
                <span class='headingCart'><h4 class='headingTitle'>${
                  item.title
                }</h4>
                <h4 class='headingAuthor'>${item.author}</h4></span>
                <h3 class='divBookPrice'>${countBooks(
                  event,
                  item.title,
                  item.author,
                  item.price,
                  item.imgsrc
                )}    x</h3>
                <h3 class='divBookPrice'>${item.price}</h3>
                <button type="button" aria-label="Remove ${
                  item.title
                }" id="closeBtn" class="btn closeBtn">x</button></li>`
    )
    .join("");
  list.innerHTML = html;
}

function countBooks(event, title, author, price, imgsrc) {
  let items = event.detail;
  const thisBooks = items.filter(
    (item) =>
      item.title === title &&
      item.author === author &&
      item.price === price &&
      item.imgsrc === imgsrc
  );
  return thisBooks.length;
}

function removeDuplicates(event) {
  let items = event.detail;
  let set = new Set();
  let result = [];

  items.forEach((item) => {
    if (!set.has(JSON.stringify(item))) {
      set.add(JSON.stringify(item));
      result.push(item);
    }
  });
  return result;
}

function displayTotal(event) {
  let items = event.detail;
  let prices = items.map((item) => parseInt(item.price));
  const total = document.querySelector(".total");
  let totalPrice = prices.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  const html = `<h4 class='divBookPrice'>Total</h4>
                <h3 class='divBookPrice'>${totalPrice}$</h3>`;
  total.innerHTML = html;
}

function disableConfirmBtn(event) {
  event.stopImmediatePropagation();
  const confirmOrder = document.querySelector(".confirmOrderBtn");
  let items = event.detail;
  if (confirmOrder) {
    if (items.length === 0) {
      this.style.fontSize = "14px";
      this.textContent = "Your cart is empty!";
      confirmOrder.style.visibility = "hidden";
    } else {
      this.style.fontSize = "12px";
      confirmOrder.style.visibility = "visible";
    }
  }
}

function mirrorToLocalStorage(event) {
  let items = event.detail || [];
  localStorage.setItem("items", JSON.stringify(items));
  console.info("Saving items to localstorage");
  console.log(items);
}

function restoreFromLocalStorage() {
  console.log("Restoring from localstorage");
  const list = document.querySelector(".list");
  const isItems = JSON.parse(localStorage.getItem("items"));
  let items = [];
  if (isItems?.length) {
    items.push(...isItems);
    list.dispatchEvent(new CustomEvent("itemsUpdated", { detail: items }));
  }
}

function deleteItem(e) {
  const button = e.target;
  const book = e.target.closest(".booksInCart");
  const imgsrc = book.childNodes[1].src;
  const list = document.querySelector(".list");
  let items = JSON.parse(localStorage.getItem("items"));
  items = items.filter((item) => item.imgsrc !== imgsrc);
  list.dispatchEvent(new CustomEvent("itemsUpdated", { detail: items }));
}

export {
  cart,
  deleteItem,
  restoreFromLocalStorage,
  mirrorToLocalStorage,
  displayItems,
  displayTotal,
  addToCart,
  pushItem,
};
