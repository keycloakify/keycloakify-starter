import { ClassNameValue, twMerge } from "tailwind-merge";

export const cn = (...args: ClassNameValue[]): string => twMerge(...args);
