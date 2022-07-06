import { create, main } from "./aggregate.js";

function createCard(books) {
  const fragment = document.createDocumentFragment();
  const container = create("div", "container", fragment);

  for (let i = 0; i < books.length; i++) {
    const card = create("div", "card", container);
    const link = create("a", "link", card);
    const figure = create("figure", "figureBook", link);
    const img = create("img", "imgBook", figure);
    img.src = books[i].imageLink;
    img.alt = books[i].title;
    img.draggable = true;
    const divBookRow = create("div", "divBookRow", figure);
    const divBookHeadings = create("div", "divBookHeadings", divBookRow);
    const headingTitle = create(
      "h4",
      "headingTitle",
      divBookHeadings,
      books[i].title
    );
    const headingAuthor = create(
      "h4",
      "headingAuthor",
      divBookHeadings,
      books[i].author
    );
    const divBuy = create("div", "divBuy", divBookRow);

    const divBookPrice = create("div", "divBookPrice", divBuy);
    const headingPrice = create(
      "h3",
      "headingPrice",
      divBookPrice,
      books[i].price + "$"
    );
    const buttonAdd = create("button", "btnAdd", divBuy, "+");
    buttonAdd.classList.add("btn");
    const buttonShowMore = create("button", "btnShowMore", card, "Show more");
    buttonShowMore.classList.add("btn");
  }
  main.append(fragment);
}

export { createCard };
