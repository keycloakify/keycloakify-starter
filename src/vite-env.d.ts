/// <reference types="vite/client" />

import type { KcContext as KcContextLogin } from "./login/kcContext";
import type { KcContext as KcContextAccount } from "./account/kcContext";

declare global {
    interface Window {
        kcContext?: KcContextLogin | KcContextAccount;
    }
}
