import { createElement, appendElement } from "./aggregate.js";

function createCard(books) {
  const fragment = document.createDocumentFragment();
  const container = appendElement(createElement("div", "container"), fragment);

  books.forEach((book) => {
    const card = appendElement(createElement("div", "card"), container);
    const link = appendElement(createElement("a", "link"), card);
    const figure = appendElement(createElement("figure", "figureBook"), link);
    const img = appendElement(createElement("img", "imgBook"), figure);
    img.src = book.imageLink;
    img.alt = book.title;
    img.draggable = true;
    const divBookRow = appendElement(
      createElement("div", "divBookRow"),
      figure
    );
    const divBookHeadings = appendElement(
      createElement("div", "divBookHeadings"),
      divBookRow
    );
    const headingTitle = appendElement(
      createElement("h4", "headingTitle", book.title),
      divBookHeadings
    );
    const headingAuthor = appendElement(
      createElement("h4", "headingAuthor", book.author),
      divBookHeadings
    );
    const divBuy = appendElement(createElement("div", "divBuy"), divBookRow);
    const divBookPrice = appendElement(
      createElement("div", "divBookPrice"),
      divBuy
    );
    const headingPrice = appendElement(
      createElement("h3", "headingPrice", book.price + "$"),
      divBookPrice
    );
    const buttonAdd = appendElement(
      createElement("button", ["btnAdd", "btn"], "+"),
      divBuy
    );
    const buttonShowMore = appendElement(
      createElement("button", ["btnShowMore", "btn"], "Show more"),
      card
    );
  });
  const main = document.querySelector(".wrapper");
  main.append(fragment);
}

export { createCard };
