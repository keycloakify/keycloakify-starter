import { generateI18nMessages } from "./generateI18nMessages";
import { generateResources } from "./generateResources";
import { extraSteps } from "./main.overridable";

(async () => {
    for (const themeType of ["login", "account"] as const) {
        await generateI18nMessages({ themeType });
    }
    await generateResources();
    await extraSteps();
})();
