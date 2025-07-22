import { insertOrUpdateMetaTag, removeMetaTag } from "../tools/metaTag";

declare global {
  interface Window {
    __keycloakify_login_ui_clearAllDarkModeSetup: (() => void) | undefined;
  }
}

export function initializeDarkMode(params: { htmlDarkModeClassName: string }) {
  const { htmlDarkModeClassName } = params;

  window.__keycloakify_login_ui_clearAllDarkModeSetup?.();

  const setColorScheme = (params: { isDark: boolean }) => {
    const { isDark } = params;
    document.documentElement.classList[isDark ? "add" : "remove"](
      htmlDarkModeClassName
    );

    insertOrUpdateMetaTag({
      name: "color-scheme",
      content: isDark ? "dark" : "light",
    });
  };

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  setColorScheme({
    isDark: mediaQuery.matches,
  });

  const onChange = (event: MediaQueryListEvent) => {
    setColorScheme({
      isDark: event.matches,
    });
  };

  mediaQuery.addEventListener("change", onChange);

  window.__keycloakify_login_ui_clearAllDarkModeSetup = () => {
    mediaQuery.removeEventListener("change", onChange);

    setColorScheme({
      isDark: false,
    });

    removeMetaTag({ name: "color-scheme" });
  };
}

export function cleanupDarkModeInitialization() {
  window.__keycloakify_login_ui_clearAllDarkModeSetup?.();
}
