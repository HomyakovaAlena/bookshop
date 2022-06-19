"use strict";

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
        buttonAdd.classList.add('btn');
        const buttonShowMore = createAddClassContentAppend('button', 'btnShowMore', card, 'Show more');
        buttonShowMore.classList.add('btn');
    }
    main.append(fragment);
  }

function cart() {
    const fragment = document.createDocumentFragment();
    const cartField = createAddClassContentAppend('div', 'cartField', fragment, 'Your cart is empty');
    main.append(fragment);
}


function footer() {
    const fragment = document.createDocumentFragment();
    const footer = createAddClassContentAppend('footer', 'footer', fragment);
    footer.id = 'footer';
    const backToTop = createAddClassContentAppend('a', 'backToTop', footer, 'Back to top')
    backToTop.href = "#header";
    const footerRow = createAddClassContentAppend('div', 'footerRow', footer);
    // const container = createAddClassContentAppend('div', 'container', footerRow);
    const spanFooter = createAddClassContentAppend('span', 'spanFooter', footerRow, '© 2022, WiseOwlBookshop.com, Inc. or its affiliates')

    main.after(fragment);
}



// function appendToMain(...fragments) {
//     main.append(...fragments);
// }

header();
createCard(books);
cart();
footer();



