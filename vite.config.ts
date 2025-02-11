import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            themeName: "Tailcloakify",
            environmentVariables: [
                { name: "TAILCLOAKIFY_ADDITIONAL_SCRIPTS", default: "" },
                { name: "TAILCLOAKIFY_BACKGROUND_LOGO_URL", default: "" },
                { name: "TAILCLOAKIFY_BACKGROUND_VIDEO_URL", default: "" },
                { name: "TAILCLOAKIFY_FAVICON_URL", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_IMPRINT_URL", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT", default: "" },
                { name: "TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT_GOOGLE_CAPTCHA", default: "TRUE" },
            ],
            kcContextExclusionsFtl: [
                '<@addToXKeycloakifyMessagesIfMessageKey str="backgroundLogoUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="backgroundVideoUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="faviconUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="footerImprintUrl" />',
                '<@addToXKeycloakifyMessagesIfMessageKey str="footerDataprotectionUrl" />',
            ].join(".\n")
        })
    ]
});
