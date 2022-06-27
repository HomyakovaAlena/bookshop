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
    
    const buttonsShowMore = document.querySelectorAll('.btnShowMore');
    const links = document.querySelectorAll('.link');

    const modalOuter = document.querySelector('.modal-outer');
    const modalInner = document.querySelector('.modal-inner');
    
    buttonsShowMore.forEach(button => button.addEventListener('click', handleCardButtonClick));
    links.forEach(button => button.addEventListener('click', handleCardButtonClick));

    function handleCardButtonClick(event) {
        const button = event.currentTarget;
        const card = button.closest('.card');
        const imgSrc = card.querySelector('img').src;
        const headingTitle = card.querySelector('.headingTitle').textContent;
        const headingAuthor = card.querySelector('.headingAuthor').textContent;
        const headingPrice = card.querySelector('.headingPrice').textContent;
        
        for (let i = 0; i < books.length; i++) {
            if (books[i].title === headingTitle) {
                card.dataset.description = books[i].description;
                
            }    
        }
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
    backToTop.href = "#header";
    const footerRow = createAddClassContentAppend('div', 'footerRow', footer);
    // const container = createAddClassContentAppend('div', 'container', footerRow);
    const spanFooter = createAddClassContentAppend('span', 'spanFooter', footerRow, '© 2022, WiseOwlBookshop.com, Inc. or its affiliates')

    main.after(fragment);
}



// function appendToMain(...fragments) {
//     main.append(...fragments);
// }



footer();



