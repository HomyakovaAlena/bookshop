import { create, main } from "./aggregate.js";

function header() {
  const fragment = document.createDocumentFragment();
  const header = create("header", "header", fragment);
  header.id = "header";
  const headerRow = create("div", "headerRow", header);
  const wrapperHeader = create("div", "wrapperHeader", headerRow);

  const link = create("a", "linkLogoHeader", wrapperHeader);

  link.href = "index.html";
  const logoOwl = create("img", "logoOwl", link);
  logoOwl.src = "../assets/icons/owl.png";
  logoOwl.alt = "Wise Owl Bookshop";
  logoOwl.id = "owl";
  const logoDiv = create("div", "logoDiv", link);
  const title = create("h1", "title", logoDiv, "Wise Owl Bookshop");
  const subtitle = create(
    "h6",
    "subtitle",
    logoDiv,
    "Amazing Bookshop with home delivery"
  );
  main.before(fragment);
}

export { header };
