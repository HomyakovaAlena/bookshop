"use strict";
// import {addStylesFontsIcons, createAddClassContentAppend, header, cart, footer} from 'main.js';
// import('main.js').then(module => {addStylesFontsIcons, createAddClassContentAppend, header, cart, footer})


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
    link.href = "index.html";
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

function checkDate() {
    let tomorrow = new Date();
    let dd = tomorrow.getDate() + 1;
    let mm = tomorrow.getMonth() + 1; 
    let yyyy = tomorrow.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    } 
    if (mm < 10) {
        mm = '0' + mm;
    } 

    tomorrow = yyyy + '-' + mm + '-' + dd;
    document.getElementById("dateField").setAttribute("min", tomorrow);
}

checkDate()

function validateCheckbox() {
    const checkbox = document.querySelectorAll('.single-checkbox')
    const max = 2;
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].onclick = selectiveCheck;
        function selectiveCheck(event) {
            const checkedChecks = document.querySelectorAll(".single-checkbox:checked");
            if (checkedChecks.length >= max + 1)
                return false;
        }
    }  
}

validateCheckbox() 


function changeSubmitBtn() {
    const submit = document.getElementById('submitBtn');
    const form = document.querySelector('.form');
    submit.setAttribute('disabled', 'disabled');
    form.addEventListener("keyup", enableCompleteBtn);
    form.addEventListener("change", enableCompleteBtn);

    function enableCompleteBtn() {
            if (form.checkValidity() === true) {
                console.log('form is valid');
                submit.removeAttribute('disabled');
            } else {
                console.log('form is invalid');
                submit.setAttribute('disabled', 'disabled');
            }
        }
}


changeSubmitBtn() 


    //     input.removeAttribute('invalid');
    //     console.log('change input to valid')
    // });
    // submit.addEventListener("click", checkValidityInputs);

function checkValidityInputs() {
    const inputs = document.querySelectorAll('input:not([type="submit"])');
    // inputs.forEach(input => {
    inputs.forEach(input => {
        
        input.addEventListener("blur", () => {
            if (input.checkValidity() === true) {
                //             input.removeAttribute('invalid');
                input.classList.add('valid');
                input.classList.remove('invalid');
            } else {
                // input.setAttribute('invalid', 'invalid');
                console.log('change input to invalid');
                input.classList.add('invalid');
                input.classList.remove('valid');
            }
        });
    });
}

checkValidityInputs()


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

cart();


function summarizeOrder() {
    const submit = document.getElementById('submitBtn');
    let cartField = document.getElementById('cartField');
    const street = document.getElementById('street');
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const house = document.getElementById('house');
    const flat = document.getElementById('flat');
    const deliveryDate = document.getElementById('dateField');

    submit.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById('cartField').innerHTML = `
            <h2>The order created.<br>
            The delivery address is ${street.value} street, house ${house.value}, flat ${flat.value}.<br> 
            Customer ${name.value} ${surname.value}.<br>
            Delivery date - ${deliveryDate.value}.</h2>`
    }
    );
}

summarizeOrder()

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

