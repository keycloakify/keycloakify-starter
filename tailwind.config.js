/** @type {import('tailwindcss').Config} */

// With v4...check .css file for @theme updates and etc.

module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)"
                }
            }
        }
    },
    plugins: []
};
