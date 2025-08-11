import { generateAccountMultiPageUiCodeFromLoginUi } from "./generateAccountMultiPageUiCodeFromLoginUi";
import { generateI18nMessages } from "./generateI18nMessages";
import { generateResources } from "./generateResources";

(async () => {
    await generateAccountMultiPageUiCodeFromLoginUi();

    for (const themeType of ["login", "account"] as const) {
        await generateI18nMessages({ themeType });
    }

    await generateResources();
})();
