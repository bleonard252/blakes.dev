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
      (document.querySelector("link[rel=stylesheet]:last-of-type") || document.querySelector("link:last-of-type")).after(_);
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
      set(new URL(
        '../styles/theme/arc-light.pcss',
        import.meta.url
      ).toString())
      break;
    case ('mint-dark'):
      set(new URL(
        '../styles/theme/mint-dark.pcss',
        import.meta.url
      ).toString())
      break;
    case ('mint-light'):
      set(new URL(
        '../styles/theme/mint-light.pcss',
        import.meta.url
      ).toString())
      break;
    case ('unity-dark'):
      set(new URL(
        '../styles/theme/unity-dark.pcss',
        import.meta.url
      ).toString())
      break;
    case ('unity-light'):
      set(new URL(
        '../styles/theme/unity-light.pcss',
        import.meta.url
      ).toString())
      break;
    case ('none'):
      document.getElementById("themeStylesheet")?.remove();
      break;
    case (null || ''):
      localStorage.theme = 'unity-light';
      set(new URL(
        '../styles/theme/unity-light.pcss',
        import.meta.url
      ).toString());
      break;
    default:
  }
}
export function X_Current_Theme() {
  return localStorage.theme;
}
