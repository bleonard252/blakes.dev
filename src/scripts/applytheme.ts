//if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  export function X_Apply_Theme() {
    const set = (theme) => document.body.setAttribute("data-theme", theme);
    switch (localStorage.theme) {
      case "none":
        document.getElementById("themeStylesheet")?.remove();
        break;
      case null || "" || undefined:
        localStorage.theme = "unity-auto";
        set("unity-auto");
        break;
      default:
        set(localStorage.theme);
    }
    if (
      localStorage.theme?.endsWith("-dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches &&
        localStorage.theme?.endsWith("-auto"))
    ) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
  export function X_Current_Theme() {
    return localStorage.theme;
  }
