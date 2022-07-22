import { createElement, appendElement, main } from "./aggregate.js";

function addModalShowMore() {
  const fragment = document.createDocumentFragment();
  const modalOuter = appendElement(
    createElement("div", "modal-outer"),
    fragment
  );
  const modalInner = appendElement(
    createElement("div", "modal-inner"),
    modalOuter
  );
  main.append(fragment);
}

function showMoreModal(books) {
  const buttonsShowMore = document.querySelectorAll(".btnShowMore");
  const links = document.querySelectorAll(".link");
  const modalOuter = document.querySelector(".modal-outer");
  const modalInner = document.querySelector(".modal-inner");
  buttonsShowMore.forEach((button) =>
    button.addEventListener("click", handleCardButtonClick)
  );
  links.forEach(
    (button) => button.addEventListener("click", handleCardButtonClick),
    false
  );

  function handleCardButtonClick(event) {
    const button = event.currentTarget;
    const card = button.closest(".card");
    const imgSrc = card.querySelector("img").src;
    const headingTitle = card.querySelector(".headingTitle").textContent;

    event.stopImmediatePropagation();
    const book = books.filter((item) => item.title === headingTitle);
    const desc = book[0].description;
    const headingAuthor = book[0].author;
    const headingPrice = book[0].price;

    modalInner.innerHTML = `
  <button type="button" id="closeBtn" class="btn closeBtn">x</button>
  <div class='modalRow'>
    <div class='modalCol1'>
        <img class='imgBookModal' src="${imgSrc.replace(
          "300",
          "200"
        )}" alt="${headingTitle}" />
    </div>
    <div class='modalCol2'>
        <h4 class='headingTitle'>${headingTitle}</h4>
        <h4 class='headingAuthor'>${headingAuthor}</h4>
        <h3 class='divBookPrice'>$${headingPrice}</h3><br><br>
        <h4>${desc}</h4>
    </div>
  </div>`;
    modalOuter.classList.add("open");
    const body = document.querySelector("body");
    body.style.overflow = "hidden";

    function closeModal() {
      modalOuter.classList.remove("open");
      const body = document.querySelector("body");
      body.style.overflow = "auto";
    }

    const closeBtn = modalInner.querySelector(".closeBtn");
    closeBtn.addEventListener("click", function () {
      closeModal();
    });

    modalOuter.addEventListener("click", function (event) {
      const isOutside = !event.target.closest(".modal-inner");
      if (isOutside) {
        closeModal();
      }

      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeModal();
        }
      });
    });
  }
}

export { addModalShowMore, showMoreModal };
