import { useEffect, useState } from "react";
import {
  initializeDarkMode,
  cleanupDarkModeInitialization,
} from "./core/darkMode";

export function useInitializeDarkMode(params: {
  doEnableDarkModeIfPreferred: boolean;
  htmlDarkModeClassName: string;
}) {
  const { doEnableDarkModeIfPreferred, htmlDarkModeClassName } = params;

  useState(() => {
    if (doEnableDarkModeIfPreferred) {
      initializeDarkMode({ htmlDarkModeClassName });
    }
  });

  useEffect(() => {
    if (doEnableDarkModeIfPreferred) {
      return () => {
        cleanupDarkModeInitialization();
      };
    }
  }, []);
}
