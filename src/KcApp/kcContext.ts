import { getKcContext } from "keycloakify/lib/getKcContext";

export const { kcContext } = getKcContext({
    /* Uncomment to test th<e login page for development */
    //"mockPageId": "login.ftl",
    "mockData": [
        {
            "pageId": "login.ftl",
            "locale": {
                "currentLanguageTag": "fr", //When we test the login page we do it in french
            },
        },
    ],
});

export type KcContext = NonNullable<typeof kcContext>;
