import { generateAccountMultiPageUiCodeFromLoginUi } from "./generateAccountMultiPageUiCodeFromLoginUi";
import { generateI18nMessages } from "./generateI18nMessages";
import { generateResources } from "./generateResources";
import { createAccountV1Dir } from "./createAccountV1Dir";

(async () => {
    await generateAccountMultiPageUiCodeFromLoginUi();
    await createAccountV1Dir();

    for (const themeType of ["login", "account"] as const) {
        await generateI18nMessages({ themeType });
        await generateResources({ themeType });
    }

})();
