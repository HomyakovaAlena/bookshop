import { createElement, appendElement, main } from "./aggregate.js";

function header() {
  const fragment = document.createDocumentFragment();
  const header = appendElement(createElement("header", "header"), fragment);
  header.id = "header";
  const headerRow = appendElement(createElement("div", "headerRow"), header);
  const wrapperHeader = appendElement(
    createElement("div", "wrapperHeader"),
    headerRow
  );

  const link = appendElement(
    createElement("a", "linkLogoHeader"),
    wrapperHeader
  );

  link.href = "index.html";
  const logoOwl = appendElement(createElement("img", "logoOwl"), link);
  logoOwl.src = "../assets/icons/owl.png";
  logoOwl.alt = "Wise Owl Bookshop";
  logoOwl.id = "owl";
  const logoDiv = appendElement(createElement("div", "logoDiv"), link);
  const title = appendElement(
    createElement("h1", "title", "Wise Owl Bookshop"),
    logoDiv
  );
  const subtitle = appendElement(
    createElement("h6", "subtitle", "Amazing Bookshop with home delivery"),
    logoDiv
  );
  main.before(fragment);
}

export { header };
