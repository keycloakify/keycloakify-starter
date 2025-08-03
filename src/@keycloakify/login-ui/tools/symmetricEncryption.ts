export const generateEncryptionKey = (): string => {
    const length = 16; // 16 bytes = 128 bits
    let key = "";
    for (let i = 0; i < length; i++) {
        const byte = Math.floor(Math.random() * 256); // 0–255
        key += byte.toString(16).padStart(2, "0");
    }
    return key;
};

const rc4 = (key: string, str: string): string => {
    const s = Array.from({ length: 256 }, (_, i) => i);
    let j = 0;

    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        [s[i], s[j]] = [s[j], s[i]];
    }

    let i = 0;
    j = 0;
    let result = "";

    for (let c = 0; c < str.length; c++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        [s[i], s[j]] = [s[j], s[i]];
        const k = s[(s[i] + s[j]) % 256];
        result += String.fromCharCode(str.charCodeAt(c) ^ k);
    }

    return result;
};

const base64Encode = (text: string): string => {
    const utf8Bytes = new TextEncoder().encode(text);
    return btoa(String.fromCharCode(...utf8Bytes));
};

const base64Decode = (base64: string): string => {
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
};

export const encrypt = (plainText: string, key: string): string => base64Encode(rc4(key, plainText));

export const decrypt = (cipherText: string, key: string): string => rc4(key, base64Decode(cipherText));
