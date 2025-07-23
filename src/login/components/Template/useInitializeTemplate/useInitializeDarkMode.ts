import { useInitializeDarkMode as useInitializeDarkMode_base } from "../../../../@keycloakify/login-ui/useInitializeDarkMode";
import { useKcContext } from "../../../KcContext";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";

export function useInitializeDarkMode() {
  const { kcContext } = useKcContext();

  const { kcClsx } = useKcClsx();

  useInitializeDarkMode_base({
    doEnableDarkModeIfPreferred: kcContext.darkMode ?? true,
    htmlDarkModeClassName: kcClsx("kcDarkModeClass"),
  });
}
