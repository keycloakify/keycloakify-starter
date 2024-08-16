import { twMerge } from "tailwind-merge";

export const cn = (...args: string[]): string => twMerge(...args);
