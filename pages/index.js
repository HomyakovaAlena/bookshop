import {
  addStyles,
  header,
  createCard,
  renderCart,
  addToCart,
  addModalShowMore,
  showMoreModal,
  dragAndDrop,
  footer,
  checkDate,
  validateCheckbox,
  changeSubmitBtn,
  checkValidityInputs,
  summarizeOrder,
} from "../assets/scripts/aggregate.js";

let books;
const main = document.querySelector(".wrapper");

async function getData() {
  const res = await fetch("../assets/json/books.json");
  const data = await res.json();
  books = data;
}

function setItemsToLocalStorage() {
  const booksInStorage = JSON.parse(localStorage.getItem("items"));
  if (!booksInStorage?.length) {
    const items = localStorage.setItem("items", JSON.stringify([]));
  }
}

async function init() {
  if (document.title === "Order confirmation") {
    addStyles();
    header();
    checkDate();
    validateCheckbox();
    changeSubmitBtn();
    checkValidityInputs();
    summarizeOrder();
    renderCart();
    const list = document.querySelector(".list");
    addToCart(list);
    footer();
  } else {
    const title = document.querySelector("title");
    title.innerHTML = "Bookshop";
    addStyles();
    header();
    await getData();
    setItemsToLocalStorage();
    createCard(books);
    const items = JSON.parse(localStorage.getItem("items"));
    renderCart();
    const list = document.querySelector(".list");
    addToCart(list);
    list.dispatchEvent(new CustomEvent("itemsUpdated", { detail: items }));
    addModalShowMore();
    showMoreModal(books);
    dragAndDrop();
    footer();
  }
}

init(books);

export { main };
