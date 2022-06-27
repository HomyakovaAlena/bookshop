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
    // const container = createAddClassContentAppend('div', 'container', fragment);

    const cartField = createAddClassContentAppend('div', 'cartField', fragment, 'Your cart is empty');
    cartField.id = 'cartField';
    main.append(fragment);
}

header();

cart();


function summarizeOrder() {
    const submit = document.getElementById('submitBtn');
    // let cartFieldContent = document.getElementById('cartField').textContent;
    const street = document.getElementById('street');
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const house = document.getElementById('house');
    const flat = document.getElementById('flat');
    const deliveryDate = document.getElementById('dateField');

    submit.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById('cartField').innerHTML = `
            The order created.<br>
            The delivery address is ${street.value} street, house ${house.value}, flat ${flat.value}.<br> 
            Customer ${name.value} ${surname.value}.<br>
            Delivery date - ${deliveryDate.value}.`
    }
    );
}

summarizeOrder()

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

