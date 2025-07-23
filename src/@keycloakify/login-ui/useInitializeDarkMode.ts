import { useLayoutEffect } from "react";
import { initializeDarkMode } from "./core/darkMode";

export function useInitializeDarkMode(params: {
  doEnableDarkModeIfPreferred: boolean;
  htmlDarkModeClassName: string;
}) {
  const { doEnableDarkModeIfPreferred, htmlDarkModeClassName } = params;

  useLayoutEffect(() => {
    if (!doEnableDarkModeIfPreferred) {
      return;
    }

    const { cleanup } = initializeDarkMode({ htmlDarkModeClassName });

    return () => {
      cleanup();
    };
  }, []);
}
