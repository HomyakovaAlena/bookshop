import {
  addStyles,
  header,
  createCard,
  cart, addToCart,
  addModalShowMore,
  showMoreModal,
  dragAndDrop,
  footer, checkDate, validateCheckbox, changeSubmitBtn, checkValidityInputs, summarizeOrder,
} from "../assets/scripts/aggregate.js";

fetch("../assets/json/books.json") //path to the file with json data
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    localStorage.setItem("books", JSON.stringify(data));

    const isItems = JSON.parse(localStorage.getItem("items"));

    if (!isItems?.length) {
      localStorage.setItem("items", JSON.stringify([]));
    }
    console.info("Saving books to localstorage");
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
