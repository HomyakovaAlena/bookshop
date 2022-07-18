function addStyles() {
    const fragment = document.createDocumentFragment();
    const head = document.querySelector("head");
  const styles = document.createElement("link");
  const fonts = document.createElement("link");
  const stylesNormalize = document.createElement("link");
  const icons = document.createElement("link");

  styles.href = "style.css";
  styles.rel = "stylesheet";
  stylesNormalize.href = "normalize.css";
  stylesNormalize.rel = "stylesheet";
  fonts.href = "../assets/fonts/stylesheet.css";
  fonts.rel = "stylesheet";
  icons.href =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
  icons.rel = "stylesheet";

  fragment.append(styles, fonts, stylesNormalize, icons);
  head.append(fragment);
}

export { addStyles };
