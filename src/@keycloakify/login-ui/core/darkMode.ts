import { insertOrUpdateMetaTag, removeMetaTag } from "../tools/metaTag";

export function initializeDarkMode(params: { htmlDarkModeClassName: string }) {
    const { htmlDarkModeClassName } = params;

    const setColorScheme = (params: { isDark: boolean }) => {
        const { isDark } = params;
        document.documentElement.classList[isDark ? "add" : "remove"](htmlDarkModeClassName);

        insertOrUpdateMetaTag({
            name: "color-scheme",
            content: isDark ? "dark" : "light"
        });
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setColorScheme({
        isDark: mediaQuery.matches
    });

    const onChange = (event: MediaQueryListEvent) => {
        setColorScheme({
            isDark: event.matches
        });
    };

    mediaQuery.addEventListener("change", onChange);

    function cleanup() {
        mediaQuery.removeEventListener("change", onChange);

        setColorScheme({
            isDark: false
        });

        removeMetaTag({ name: "color-scheme" });
    }

    return { cleanup };
}
