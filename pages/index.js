import {
  addStyles,
  header,
  createCard,
  cart,
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

async function getData() {
  await fetch("../assets/json/books.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("books", JSON.stringify(data));

      const isItems = JSON.parse(localStorage.getItem("items"));
      const isbooks = JSON.parse(localStorage.getItem("books"));

      if (!isItems?.length) {
        let items = localStorage.setItem("items", JSON.stringify([]));
      }

      if (!isbooks?.length) {
        let books = localStorage.setItem("books", JSON.stringify([]));
      }

      console.info("Saving books to localstorage");
    });
}

const main = document.querySelector(".wrapper");
const books = JSON.parse(localStorage.getItem("books"));

if (document.title === "Order confirmation") {
  async function init(books) {
    await getData();
    books = JSON.parse(localStorage.getItem("books"));
    addStyles();
    header();
    checkDate();
    validateCheckbox();
    changeSubmitBtn();
    checkValidityInputs();
    summarizeOrder();
    cart();
    addToCart();
    footer();
  }

  init(books);
} else {
  const title = document.querySelector("title");
  title.innerHTML = "Bookshop";
  async function init(books) {
    addStyles();
    header();
    await getData();
    books = JSON.parse(localStorage.getItem("books"));
    console.log(books);
    await createCard(books);

    let items = JSON.parse(localStorage.getItem("items"));
    cart();
    addToCart();

    const list = document.querySelector(".list");
    list.dispatchEvent(new CustomEvent("itemsUpdated", { detail: items }));

    addModalShowMore();
    showMoreModal(books);
    dragAndDrop();
    footer();
  }

  init(books);
}

export { main };
