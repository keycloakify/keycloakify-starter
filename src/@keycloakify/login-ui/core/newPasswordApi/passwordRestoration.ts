import { assert } from "tsafe/assert";
import { generateEncryptionKey, encrypt, decrypt } from "../../tools/symmetricEncryption";
import { addCookie, getCookie, removeCookie } from "../../tools/cookie";
import { getElementNowOrWhenMounted } from "../../tools/getElementNowOrWhenMounted";

const COOKIE_NAME_ENCRYPTED_PASSWORD= "keycloakify-xKdPmKd";
const SESSION_STORAGE_ENTRY_NAME_ENCRYPTION_KEY= "keycloakify-mPdKdPdx";

let cleanup: (() => void) | undefined;

export function persistPasswordOnFormSubmit(params: { fieldName: string; }) {

    const { fieldName } = params;

    cleanup?.();

    const { prElement, cancel} = getElementNowOrWhenMounted({ selector: 'input[name="password"]' });

    prElement.then(passwordInputElement => {

        assert(passwordInputElement instanceof HTMLInputElement);

        const formElement = passwordInputElement.closest("form");

        if( formElement === null ){
            return;
        }

        assert(formElement instanceof HTMLFormElement);

        const persistPassword = () => {
            const passwordValue = passwordInputElement.value;

            const key = generateEncryptionKey();

            const encryptedPassword = encrypt(passwordValue, key);

            addCookie(
                COOKIE_NAME_ENCRYPTED_PASSWORD,
                encryptedPassword,
                10,
                location.pathname
            );

            sessionStorage.setItem(SESSION_STORAGE_ENTRY_NAME_ENCRYPTION_KEY, key);
        };

        formElement.addEventListener("submit", persistPassword);

        cleanup= ()=> {
            formElement.removeEventListener("submit", persistPassword);
            cleanup = undefined;
        };

    });

    cleanup = ()=> {cancel(); cleanup=undefined; };

}

export function getPersistedPassword(): string | undefined{

        const encodedPassword = getCookie(COOKIE_NAME_ENCRYPTED_PASSWORD);

        if (encodedPassword === undefined) {
            sessionStorage.removeItem(SESSION_STORAGE_ENTRY_NAME_ENCRYPTION_KEY);
            return undefined;
        }

        removeCookie(COOKIE_NAME_ENCRYPTED_PASSWORD, location.pathname);

        const key = sessionStorage.getItem(SESSION_STORAGE_ENTRY_NAME_ENCRYPTION_KEY);
        if (key === null) {
            return;
        }

        sessionStorage.removeItem(SESSION_STORAGE_ENTRY_NAME_ENCRYPTION_KEY);

        const password = decrypt(encodedPassword, key);

        return password;
}

