// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
"use strict"; // Proxy for dealing with CORS issue: https://wesbos.com/javascript/13-ajax-and-fetching-data/75-cors-and-recipes
// const baseEndpoint = "http://www.recipepuppy.com/api";
// async function fetchRecipes(query) {
//   const res = await fetch(
//     `https://cors-anywhere.herokuapp.com/${baseEndpoint}?q=${query}`
//   );
//   const data = await res.json();
// }
// fetchRecipes("pizza");

var head = document.querySelector('head');
var title = document.querySelector('title');
title.innerHTML = 'Bookshop';
var main = document.querySelector('.wrapper');

function addStylesFontsIcons() {
  var fragment = document.createDocumentFragment();
  var styles = document.createElement('link');
  var fonts = document.createElement('link');
  var stylesNormalize = document.createElement('link');
  var icons = document.createElement('link');
  styles.href = 'style.css';
  styles.rel = "stylesheet";
  stylesNormalize.href = 'normalize.css';
  stylesNormalize.rel = "stylesheet";
  fonts.href = '../assets/fonts/stylesheet.css';
  fonts.rel = "stylesheet";
  icons.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
  icons.rel = 'stylesheet';
  fragment.append(styles, fonts, stylesNormalize, icons);
  head.append(fragment);
}

addStylesFontsIcons();

function createAddClassContentAppend(element, newClass, parentElement) {
  var content = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var newElement = document.createElement(element);
  newElement.classList.add(newClass);

  if (content != '') {
    newElement.textContent = content;
  }

  parentElement.append(newElement);
  return newElement;
}

function header() {
  var fragment = document.createDocumentFragment();
  var header = createAddClassContentAppend('header', 'header', fragment);
  header.id = 'header';
  var headerRow = createAddClassContentAppend('div', 'headerRow', header);
  var wrapperHeader = createAddClassContentAppend('div', 'wrapperHeader', headerRow);
  var link = createAddClassContentAppend('a', 'linkLogoHeader', wrapperHeader);
  link.href = "#owl";
  var logoOwl = createAddClassContentAppend('img', 'logoOwl', link);
  logoOwl.src = '../assets/icons/owl.png';
  logoOwl.alt = 'Wise Owl Bookshop';
  logoOwl.id = 'owl';
  var logoDiv = createAddClassContentAppend('div', 'logoDiv', link);
  var title = createAddClassContentAppend('h1', 'title', logoDiv, 'Wise Owl Bookshop');
  var subtitle = createAddClassContentAppend('h6', 'subtitle', logoDiv, 'Amazing Bookshop with home delivery');
  var cart = createAddClassContentAppend('span', 'material-symbols-outlined', wrapperHeader, 'shopping_cart');
  cart.id = 'cart';
  main.before(fragment);
}

function createCard(books) {
  var fragment = document.createDocumentFragment();
  var container = createAddClassContentAppend('div', 'container', fragment);

  for (var i = 0; i < books.length; i++) {
    // const contentBookDescription = books[i].description;
    var card = createAddClassContentAppend('div', 'card', container);
    var link = createAddClassContentAppend('a', 'link', card);
    var figure = createAddClassContentAppend('figure', 'figureBook', link);
    var img = createAddClassContentAppend('img', 'imgBook', figure);
    img.src = books[i].imageLink;
    img.alt = books[i].title;
    var divBookRow = createAddClassContentAppend('div', 'divBookRow', figure);
    var divBookHeadings = createAddClassContentAppend('div', 'divBookHeadings', divBookRow);
    var headingTitle = createAddClassContentAppend('h4', 'headingTitle', divBookHeadings, books[i].title);
    var headingAuthor = createAddClassContentAppend('h4', 'headingAuthor', divBookHeadings, books[i].author);
    var divBuy = createAddClassContentAppend('div', 'divBuy', divBookRow);
    var divBookPrice = createAddClassContentAppend('div', 'divBookPrice', divBuy);
    var headingPrice = createAddClassContentAppend('h3', 'headingPrice', divBookPrice, books[i].price + '$');
    var buttonAdd = createAddClassContentAppend('button', 'btnAdd', divBuy, '+');
    buttonAdd.type = 'submit';
    buttonAdd.classList.add('btn');
    var buttonShowMore = createAddClassContentAppend('button', 'btnShowMore', card, 'Show more');
    buttonShowMore.classList.add('btn');
  }

  main.append(fragment);
}

function cart() {
  var fragment = document.createDocumentFragment();
  var cartField = createAddClassContentAppend('div', 'cartField', fragment, 'Your cart is empty');
  var list = createAddClassContentAppend('ul', 'list', cartField);
  var items = [];
  var buttonsAdd = document.querySelectorAll(".btnAdd");
  var cards = document.querySelectorAll(".card");
  var modalInner = document.querySelector('.modal-inner');
  buttonsAdd.forEach(function (button) {
    return button.addEventListener('submit', handleSubmit);
  }); // const buttonAdd = modalInner.querySelector('.btnAdd');
  // closeBtn.addEventListener('click', function () {
  //     closeModal();
  // });

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted!!!!");
    var name = event.currentTarget.value;
    console.log(name);
  } // cards.addEventListener('submit', handleSubmit);
  // modal.addEventListener('submit', handleSubmit);


  main.append(fragment);
}

header();
createCard(books);
cart();

function addModalShowMore() {
  var fragment = document.createDocumentFragment();
  var modalOuter = createAddClassContentAppend('div', 'modal-outer', fragment, '');
  var modalInner = createAddClassContentAppend('div', 'modal-inner', modalOuter, '');
  main.append(fragment);
}

function showMoreModal() {
  var buttonsShowMore = document.querySelectorAll('.btnShowMore');
  var links = document.querySelectorAll('.link');
  var modalOuter = document.querySelector('.modal-outer');
  var modalInner = document.querySelector('.modal-inner');
  buttonsShowMore.forEach(function (button) {
    return button.addEventListener('click', handleCardButtonClick);
  }); // links.forEach(button => button.addEventListener('click', handleCardButtonClick));
  // links.forEach(button => button.addEventListener('click', function (event) {
  //     const isNotAddBtn = !event.target.closest('.btnAdd');
  //     if (isNotAddBtn) {
  //         handleCardButtonClick;
  //     }
  // }));

  function handleCardButtonClick(event) {
    var button = event.currentTarget;
    var card = button.closest('.card');
    var imgSrc = card.querySelector('img').src;
    var headingTitle = card.querySelector('.headingTitle').textContent;
    var headingAuthor = card.querySelector('.headingAuthor').textContent;
    var headingPrice = card.querySelector('.headingPrice').textContent;
    var book = books.filter(function (item) {
      return item.title === headingTitle;
    });
    card.dataset.description = book[0].description;
    var desc = card.dataset.description;
    modalInner.innerHTML = "\n  <button type=\"button\" id=\"closeBtn\" class=\"btn closeBtn\">x</button>\n  <div class='modalRow'>\n    <div class='modalCol1'>\n        <img class='imgBookModal' src=\"".concat(imgSrc.replace('300', '200'), "\" alt=\"").concat(headingTitle, "\" />\n    </div>\n    <div class='modalCol2'>\n        <h4 class='headingTitle'>").concat(headingTitle, "</h4>\n        <h4 class='headingAuthor'>").concat(headingAuthor, "</h4>\n        <h3 class='divBookPrice'>").concat(headingPrice, "</h3><br><br>\n        <h4>").concat(desc, "</h4>\n        <button type=\"submit\" class='btnAdd btn'>+</button>\n    </div>\n  </div>");
    modalOuter.classList.add('open');

    function closeModal() {
      modalOuter.classList.remove('open');
    }

    var closeBtn = modalInner.querySelector('.closeBtn');
    closeBtn.addEventListener('click', function () {
      closeModal();
    });
    modalOuter.addEventListener('click', function (event) {
      var isOutside = !event.target.closest('.modal-inner');

      if (isOutside) {
        closeModal();
      }

      window.addEventListener('keydown', function (event) {
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
  var fragment = document.createDocumentFragment();
  var footer = createAddClassContentAppend('footer', 'footer', fragment);
  footer.id = 'footer';
  var backToTop = createAddClassContentAppend('a', 'backToTop', footer, 'Back to top');
  backToTop.href = "#owl";
  var footerRow = createAddClassContentAppend('div', 'footerRow', footer); // const container = createAddClassContentAppend('div', 'container', footerRow);

  var spanFooter = createAddClassContentAppend('span', 'spanFooter', footerRow, '© 2022, WiseOwlBookshop.com, Inc. or its affiliates');
  main.after(fragment);
} // function appendToMain(...fragments) {
//     main.append(...fragments);
// }


footer();
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57162" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map