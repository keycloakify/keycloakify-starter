
export const addCookie = (
    name: string,
    value: string,
    maxAgeSeconds: number,
    path: string
) => {
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=${path}; Secure; SameSite=Strict`;
};

export const getCookie = (name: string): string | undefined => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : undefined;
};

export const removeCookie = (name: string, path: string): void => {
    document.cookie = `${name}=; max-age=0; path=${path}; Secure; SameSite=Strict`;
};