
import { downloadKeycloakDefaultTheme_login } from "./downloadKeycloakDefaultTheme_login";
import { downloadKeycloakDefaultTheme_account } from "./downloadKeycloakDefaultTheme_account";

export async function downloadKeycloakDefaultTheme(params: { themeType: "login" | "account" }): Promise<{ extractedDirPath: string; }> {
    const { themeType } = params;

    switch(themeType){
        case "login": return downloadKeycloakDefaultTheme_login();
        case "account": return downloadKeycloakDefaultTheme_account();
    }
}

