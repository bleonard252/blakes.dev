// Browser import!

//if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
export function X_Apply_Theme() {
  function set(stylesheet: string) {
    if (document.getElementById("themeStylesheet")) {
      document.getElementById("themeStylesheet").outerHTML = `<link rel="stylesheet" href="${stylesheet}" id="themeStylesheet">`;
    } else {
      const _ = document.createElement("link");
      _.rel = "stylesheet";
      _.id = "themeStylesheet";
      _.href = stylesheet;
      document.querySelector("link[rel=stylesheet]:last-of-type").after(_);
    }
  }
  switch (localStorage.theme) {
    case ('arc-dark'):
      set(new URL(
        '../styles/theme/arc-dark.pcss',
        import.meta.url
      ).toString())
      break;
    case ('arc-light'):
      //set("");
      //document.getElementById("themeStylesheet")?.remove();
      set(new URL(
        '../styles/theme/arc-light.pcss',
        import.meta.url
      ).toString())
      break;
  }
}
export function X_Current_Theme() {
  return localStorage.theme;
}
