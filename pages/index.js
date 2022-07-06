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

fetch("../assets/json/books.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    localStorage.setItem("books", JSON.stringify(data));

    const isItems = JSON.parse(localStorage.getItem("items"));

    if (!isItems?.length) {
      let items = localStorage.setItem("items", JSON.stringify([]));
    }
    let items = JSON.parse(localStorage.getItem("items"));
    console.info("Saving books to localstorage");
    const list = document.querySelector(".list");
    list.dispatchEvent(new CustomEvent("itemsUpdated", { detail: items }));
  });

const main = document.querySelector(".wrapper");
const books = JSON.parse(localStorage.getItem("books"));

if (document.title === "Order confirmation") {
  function init(books) {
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
  const books = JSON.parse(localStorage.getItem("books"));
  const title = document.querySelector("title");
  title.innerHTML = "Bookshop";

  if (document.title === "Bookshop") {
    function init(books) {
      addStyles();
      createCard(books);
      header();
      cart();
      addToCart();
      addModalShowMore();
      showMoreModal(books);
      dragAndDrop();
      footer();
    }

    init(books);
  }
}

export { main };
