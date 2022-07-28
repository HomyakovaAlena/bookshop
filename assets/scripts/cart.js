function addToCart(list) {
  const container = document.querySelector(".container");
  container?.addEventListener(
    "click",
    (event) => {
      const button = event.target;
      if (button.matches(".btnAdd")) {
        event.stopPropagation();
        pushItemToCart(button);
      }
    },
    true
  );
  list.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
      deleteItem(e);
    }
  });
  list.addEventListener("itemsUpdated", (event) => {
    mirrorToLocalStorage(event);
    displayItems(event);
    displayTotal(event);
    disableConfirmBtn(event);
  });
  restoreFromLocalStorage();
}

function pushItemToCart(button) {
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
  };
  const items = JSON.parse(localStorage.getItem("items"));
  items.push(item);
  list.dispatchEvent(new CustomEvent("itemsUpdated", { detail: items }));
}

function displayItems(event) {
  const items = removeDuplicates(event);
  const list = event.currentTarget;
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
  const items = event.detail;
  const set = new Set();
  const result = [];
  items.forEach((item) => {
    const itemString = JSON.stringify(item);
    if (!set.has(itemString)) {
      set.add(itemString);
      result.push(item);
    }
  });
  return result;
}

function displayTotal(event) {
  const items = event.detail;
  const prices = items.map((item) => parseInt(item.price));
  const total = document.querySelector(".total");
  const totalPrice = prices.reduce(
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
  const items = event.detail;
  const list = event.currentTarget;
  if (confirmOrder) {
    if (items.length === 0) {
      list.classList.add("font-enlarge");
      list.textContent = "Your cart is empty!";
      confirmOrder.style.visibility = "hidden";
    } else {
      list.classList.remove("font-enlarge");
      confirmOrder.style.visibility = "visible";
    }
  }
}

function mirrorToLocalStorage(event) {
  const items = event.detail || [];
  localStorage.setItem("items", JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const list = document.querySelector(".list");
  const booksInStorage = JSON.parse(localStorage.getItem("items"));
  const items = [];
  if (booksInStorage?.length) {
    items.push(...booksInStorage);
    list.dispatchEvent(new CustomEvent("itemsUpdated", { detail: items }));
  }
}

function deleteItem(e) {
  const book = e.target.closest(".booksInCart");
  const imgsrc = book.querySelector("img").src;
  const list = document.querySelector(".list");
  const booksInStorage = JSON.parse(localStorage.getItem("items"));
  const items = booksInStorage.filter((item) => item.imgsrc !== imgsrc);
  list.dispatchEvent(new CustomEvent("itemsUpdated", { detail: items }));
}

export {
  deleteItem,
  restoreFromLocalStorage,
  mirrorToLocalStorage,
  displayItems,
  displayTotal,
  addToCart,
  pushItemToCart,
};
