import { createElement, appendElement, main } from "./aggregate.js";

function footer() {
  const fragment = document.createDocumentFragment();
  const footer = appendElement(createElement("footer", "footer"), fragment);
  footer.id = "footer";
  const backToTop = appendElement(
    createElement("a", "backToTop", "Back to top"),
    footer
  );
  backToTop.href = "#owl";
  const footerRow = appendElement(createElement("div", "footerRow"), footer);
  const spanFooter = appendElement(
    createElement(
      "span",
      "spanFooter",
      "© 2022, WiseOwlBookshop.com, Inc. or its affiliates"
    ),
    footerRow
  );

  main.after(fragment);
}

export { footer };
