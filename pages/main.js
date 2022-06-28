"use strict";

// Proxy for dealing with CORS issue: https://wesbos.com/javascript/13-ajax-and-fetching-data/75-cors-and-recipes

// const baseEndpoint = "http://www.recipepuppy.com/api";
// async function fetchRecipes(query) {
//   const res = await fetch(
//     `https://cors-anywhere.herokuapp.com/${baseEndpoint}?q=${query}`
//   );
//   const data = await res.json();
// }
// fetchRecipes("pizza");


const head = document.querySelector('head');
const title = document.querySelector('title');
title.innerHTML = 'Bookshop';
const main = document.querySelector('.wrapper');

function addStylesFontsIcons() {
    const fragment = document.createDocumentFragment();
    const styles = document.createElement('link');
    const fonts = document.createElement('link');
    const stylesNormalize = document.createElement('link');
    const icons = document.createElement('link');

    styles.href = 'style.css';
    styles.rel = "stylesheet"
    stylesNormalize.href = 'normalize.css';
    stylesNormalize.rel = "stylesheet"
    fonts.href = '../assets/fonts/stylesheet.css';
    fonts.rel = "stylesheet";
    icons.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    icons.rel = 'stylesheet';  

    fragment.append(styles, fonts, stylesNormalize, icons);
    head.append(fragment);
}

addStylesFontsIcons();


function createAddClassContentAppend(element, newClass, parentElement, content = '') {
    const newElement = document.createElement(element);
    newElement.classList.add(newClass);
    if (content != '') {
        newElement.textContent = content;
    }
    parentElement.append(newElement);
    return newElement;
}


function header() {
    const fragment = document.createDocumentFragment();
    const header = createAddClassContentAppend('header', 'header', fragment);
    header.id = 'header';
    
    const headerRow = createAddClassContentAppend('div', 'headerRow', header);
    const wrapperHeader = createAddClassContentAppend('div', 'wrapperHeader', headerRow);

    const link = createAddClassContentAppend('a', 'linkLogoHeader', wrapperHeader);
    link.href = "#owl";
    const logoOwl = createAddClassContentAppend('img', 'logoOwl', link);
    logoOwl.src = '../assets/icons/owl.png';
    logoOwl.alt = 'Wise Owl Bookshop';
    logoOwl.id = 'owl';
    const logoDiv = createAddClassContentAppend('div', 'logoDiv', link);
    const title = createAddClassContentAppend('h1', 'title', logoDiv, 'Wise Owl Bookshop');
    const subtitle = createAddClassContentAppend('h6', 'subtitle', logoDiv, 'Amazing Bookshop with home delivery');
    const cart = createAddClassContentAppend('span', 'material-symbols-outlined', wrapperHeader, 'shopping_cart');
    cart.id = 'cart';
    main.before(fragment);
}


function createCard(books) {
    const fragment = document.createDocumentFragment();
    const container = createAddClassContentAppend('div', 'container', fragment);

    for (let i = 0; i < books.length; i++) {
        // const contentBookDescription = books[i].description;
        const card = createAddClassContentAppend('div', 'card', container);
        const link = createAddClassContentAppend('a', 'link', card);
        const figure = createAddClassContentAppend('figure', 'figureBook', link);
        const img = createAddClassContentAppend('img', 'imgBook', figure);
        img.src = books[i].imageLink;
        img.alt = books[i].title;
        const divBookRow = createAddClassContentAppend('div', 'divBookRow', figure);
        const divBookHeadings = createAddClassContentAppend('div', 'divBookHeadings', divBookRow);
        const headingTitle = createAddClassContentAppend('h4', 'headingTitle', divBookHeadings, books[i].title);
        const headingAuthor = createAddClassContentAppend('h4', 'headingAuthor', divBookHeadings, books[i].author);
        const divBuy = createAddClassContentAppend('div', 'divBuy', divBookRow);

        const divBookPrice = createAddClassContentAppend('div', 'divBookPrice', divBuy);
        const headingPrice = createAddClassContentAppend('h3', 'headingPrice', divBookPrice, books[i].price + '$');
        const buttonAdd = createAddClassContentAppend('button', 'btnAdd', divBuy, '+');
        // buttonAdd.type = 'submit';
        buttonAdd.classList.add('btn');
        const buttonShowMore = createAddClassContentAppend('button', 'btnShowMore', card, 'Show more');
        buttonShowMore.classList.add('btn');
    }
    main.append(fragment);
  }

function cart() {
    const fragment = document.createDocumentFragment();
    const cartField = createAddClassContentAppend('div', 'cartField', fragment, '');
    cartField.id = 'cartField';
    const list = createAddClassContentAppend('ul', 'list', cartField);
    const total = createAddClassContentAppend('div', 'liRow', cartField);
    const confirmOrder = createAddClassContentAppend('a', 'confirmOrderBtn', cartField, 'Confirm order');
    confirmOrder.classList.add('btn');
    confirmOrder.href = "form.html";
    main.append(fragment);

    let items = [];
    const buttonsAdd = document.querySelectorAll(".btnAdd");
    // const cards = document.querySelectorAll(".card");
    const modalInner = document.querySelector('.modal-inner');
    console.log(buttonsAdd);
    buttonsAdd.forEach(button => button.addEventListener('click', handleClick));
    
    // const closeBtn = list.querySelectorAll('closeBtn');
    // console.log(closeBtn);
    // const newItems = items.filter(item => item.id !== id);
    
    function handleClick(event) {      
        // console.log("Submitted!!!!");  
        const button = event.currentTarget;
        const card = button.closest('.card');
        const imgSrc = card.querySelector('img').src;
        const headingTitle = card.querySelector('.headingTitle').textContent;
        const headingAuthor = card.querySelector('.headingAuthor').textContent;
        const headingPrice = card.querySelector('.headingPrice').textContent;
       
        const item = {
            imgsrc: `${imgSrc.replace('300', '100')}`,
            imgalt: `${headingTitle}`,
            title: `${headingTitle}`,
            author: `${headingAuthor}`,
            price: `${headingPrice}`,
            id: Date.now(),
            complete: false
        }
        
        items.push(item);
        // console.log(`There are now ${items.length} in your state`);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
    // modal.addEventListener('submit', handleSubmit);

    function displayItems() {
        console.log(items);
        const html = items
            .map(
                (item) => `<li class='liRow'>
                <img class='imgBookCart' src="${item.imgsrc}" alt="${item.title}" />
                <span class='headingCart'><h4 class='headingTitle'>${item.title}</h4>
                <h4 class='headingAuthor'>${item.author}</h4></span>    
                <h3 class='divBookPrice'>${item.price}</h3>
                <button type="button" aria-label="Remove ${item.title}" value="${item.id}" id="closeBtn" class="btn closeBtn">x</button></li>`                       
            )
            .join('');
        list.innerHTML = html;
    }

    function displayTotal() {
        console.log(items);
        let prices = items.map((item) => parseInt(item.price));
        let totalPrice = prices.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
            0);
        // list.dispatchEvent(new CustomEvent('itemsUpdated'));
        
                const html = `<h4 class='divBookPrice'>Total</h4>
                <h3 class='divBookPrice'>${totalPrice}$</h3>`;
        total.innerHTML = html;
        
            // total.visibility = 'hidden';
            // confirmOrder.visibility = 'hidden';
        
    }

    function mirrorToLocalStorage() {
        localStorage.setItem('items', JSON.stringify(items));
        console.info('Saving items to localstorage');
    }

    function restoreFromLocalStorage() {
        console.log('Restoring from localstorage');
        const lsItems = JSON.parse(localStorage.getItem("items"));

        if (lsItems.length) {
            items.push(...lsItems);
            list.dispatchEvent(new CustomEvent('itemsUpdated'));
        }
        
    }

    function deleteItem(id) {
        // console.log("DELETING ITEM!!!", id);
        items = items.filter((item) => item.id !== id);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }

    
    list.addEventListener('click', function(e) {
        // console.log(e.target, e.currentTarget);
        if (e.target.matches("button")) {
            deleteItem(parseInt(e.target.value));
        }
    });

    list.addEventListener('itemsUpdated', displayItems);
    list.addEventListener('itemsUpdated', displayTotal);
    list.addEventListener("itemsUpdated", mirrorToLocalStorage);
    restoreFromLocalStorage();
}



header();
createCard(books);
cart();



function addModalShowMore() {
    const fragment = document.createDocumentFragment(); 
    const modalOuter = createAddClassContentAppend('div', 'modal-outer', fragment, '');
    const modalInner = createAddClassContentAppend('div', 'modal-inner', modalOuter, '');
    main.append(fragment);
}


function showMoreModal() {
    
    const buttonsAdd = document.querySelectorAll('.btnAdd');
    const buttonsShowMore = document.querySelectorAll('.btnShowMore');
    const links = document.querySelectorAll('.link');

    const modalOuter = document.querySelector('.modal-outer');
    const modalInner = document.querySelector('.modal-inner');
    
    buttonsShowMore.forEach(button => button.addEventListener('click', handleCardButtonClick));
    // links.forEach(button => button.addEventListener('click', handleCardButtonClick));
    
    links.forEach(link => link.addEventListener('click', (event) => {
        if (!(event.target.matches("button"))) handleCardButtonClick
    }));
            

    function handleCardButtonClick(event) {
        // console.log(event.target, event.currentTarget);
        const button = event.currentTarget;
        // console.log(event.target);
        const card = button.closest('.card');
        const imgSrc = card.querySelector('img').src;
        const headingTitle = card.querySelector('.headingTitle').textContent;
        const headingAuthor = card.querySelector('.headingAuthor').textContent;
        const headingPrice = card.querySelector('.headingPrice').textContent;

        const book = books.filter(item => item.title === headingTitle);
        card.dataset.description = book[0].description;
        const desc = card.dataset.description;
        modalInner.innerHTML = `
  <button type="button" id="closeBtn" class="btn closeBtn">x</button>
  <div class='modalRow'>
    <div class='modalCol1'>
        <img class='imgBookModal' src="${imgSrc.replace('300', '200')}" alt="${headingTitle}" />
    </div>
    <div class='modalCol2'>
        <h4 class='headingTitle'>${headingTitle}</h4>
        <h4 class='headingAuthor'>${headingAuthor}</h4>
        <h3 class='divBookPrice'>${headingPrice}</h3><br><br>
        <h4>${desc}</h4>
        <button class='btnAdd btn'>+</button>
    </div>
  </div>`;
        modalOuter.classList.add('open');
    
        function closeModal() {
        modalOuter.classList.remove('open');
    } 

 
    const closeBtn = modalInner.querySelector('.closeBtn');
    closeBtn.addEventListener('click', function () {
        closeModal();
    });
        
    

    modalOuter.addEventListener('click', function (event) {
        const isOutside = !event.target.closest('.modal-inner');
        if (isOutside) {
            closeModal();
        }

        
    window.addEventListener('keydown', event => {
        console.log(event);
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    });  
    } 
}

addModalShowMore();

showMoreModal();


function footer() {
    const fragment = document.createDocumentFragment();
    const footer = createAddClassContentAppend('footer', 'footer', fragment);
    footer.id = 'footer';
    const backToTop = createAddClassContentAppend('a', 'backToTop', footer, 'Back to top')
    backToTop.href = "#owl";
    const footerRow = createAddClassContentAppend('div', 'footerRow', footer);
    // const container = createAddClassContentAppend('div', 'container', footerRow);
    const spanFooter = createAddClassContentAppend('span', 'spanFooter', footerRow, '© 2022, WiseOwlBookshop.com, Inc. or its affiliates')

    main.after(fragment);
}



// function appendToMain(...fragments) {
//     main.append(...fragments);
// }



footer();



