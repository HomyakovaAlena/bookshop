import { create, main } from "./aggregate.js";

function footer() {
  const fragment = document.createDocumentFragment();
  const footer = create("footer", "footer", fragment);
  footer.id = "footer";
  const backToTop = create(
    "a",
    "backToTop",
    footer,
    "Back to top"
  );
  backToTop.href = "#owl";
  const footerRow = create("div", "footerRow", footer);
  const spanFooter = create(
    "span",
    "spanFooter",
    footerRow,
    "© 2022, WiseOwlBookshop.com, Inc. or its affiliates"
  );

  main.after(fragment);
}

export { footer };
