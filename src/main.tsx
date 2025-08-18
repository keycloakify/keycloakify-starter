if (window.kcContext !== undefined) {
    import("./main-kc");
} else {
    import("./main-kc.dev");
}
