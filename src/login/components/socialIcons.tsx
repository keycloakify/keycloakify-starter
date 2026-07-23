// Brand SVG icons for identity-provider (OAuth) buttons.
// Matched by Keycloak `providerId` first, then by the alias substring, so that
// custom OIDC providers (yandex/vk/sber, which have no built-in Keycloak icon)
// are recognised by the alias configured in the realm. Adding a new provider on
// the backend only requires adding one entry here — the Login page stays untouched.

import type { ReactNode } from "react";

type IconKey = "google" | "apple" | "facebook" | "yandex" | "vk" | "sber";

const ICONS: Record<IconKey, ReactNode> = {
    google: (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M23.52 12.27c0-.82-.07-1.6-.21-2.36H12v4.46h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.72Z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.09A12 12 0 0 0 12 24Z"
            />
            <path
                fill="#FBBC05"
                d="M5.29 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.28a12 12 0 0 0 0 10.76l4.01-3.09Z"
            />
            <path
                fill="#EA4335"
                d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.28 6.62l4.01 3.09C6.23 6.86 8.88 4.75 12 4.75Z"
            />
        </svg>
    ),
    apple: (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
                fill="#fff"
                d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.02-3.76-2.05-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.9-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.23 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.27 3.13-2.53.99-1.45 1.4-2.86 1.42-2.93-.03-.01-2.72-1.04-2.75-4.12ZM14.5 4.86c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.58 3.04-1.45Z"
            />
        </svg>
    ),
    facebook: (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
                fill="#1877F2"
                d="M24 12c0-6.63-5.37-12-12-12S0 5.37 0 12c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08V12h3.05V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87V12h3.33l-.53 3.47h-2.8v8.38C19.61 22.95 24 17.99 24 12Z"
            />
        </svg>
    ),
    yandex: (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#FC3F1D" />
            <path
                fill="#fff"
                d="M13.3 6.32h-1.17c-2.14 0-3.27 1.1-3.27 2.72 0 1.83.79 2.68 2.4 3.78l1.33.9-3.83 5.72H5.9l3.45-5.13c-1.97-1.41-3.08-2.78-3.08-5.09 0-2.9 2.02-4.87 5.85-4.87h2.08v14.09H13.3V6.32Z"
            />
        </svg>
    ),
    vk: (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
                fill="#0077FF"
                d="M13.16 17.34c-5.47 0-8.86-3.79-9-10.09h2.76c.1 4.63 2.19 6.6 3.8 7v-7h2.62v3.96c1.57-.17 3.22-2 3.78-3.96h2.6a7.53 7.53 0 0 1-3.4 4.9c1.7.9 2.99 2.45 3.83 5.19h-2.86c-.66-2.06-1.98-3.65-3.95-3.83v3.83h-.98Z"
            />
        </svg>
    ),
    sber: (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
                fill="#21A038"
                d="M12 4.4c1.42 0 2.75.38 3.9 1.04l-1.7 1.25A5.6 5.6 0 1 0 17.6 12c0-.2-.01-.4-.03-.6l1.86-1.37c.24.94.32 1.75.32 1.97a7.75 7.75 0 1 1-7.75-7.6Z"
            />
            <path
                fill="#21A038"
                d="M20.6 6.36 12 12.6 8.5 10.1v2.55l3.5 2.5 9.2-6.66a7.9 7.9 0 0 0-.6-2.13Z"
            />
        </svg>
    )
};

const MATCHERS: [IconKey, string[]][] = [
    ["google", ["google"]],
    ["apple", ["apple"]],
    ["facebook", ["facebook", "fb"]],
    ["yandex", ["yandex", "ya"]],
    ["vk", ["vk", "vkontakte"]],
    ["sber", ["sber", "sberid", "sberbank"]]
];

/** Generic fallback for unknown providers so any new IdP still gets a decent icon. */
const GENERIC_ICON: ReactNode = (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path
            d="M4 20c0-3.87 3.58-7 8-7s8 3.13 8 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
        />
    </svg>
);

export function getSocialProviderIcon(params: {
    providerId?: string;
    alias?: string;
}): ReactNode {
    const haystack = `${params.providerId ?? ""} ${params.alias ?? ""}`.toLowerCase();

    for (const [key, keywords] of MATCHERS) {
        if (keywords.some(keyword => haystack.includes(keyword))) {
            return ICONS[key];
        }
    }

    return GENERIC_ICON;
}
