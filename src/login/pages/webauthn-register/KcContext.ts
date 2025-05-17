
export type KcContext = Extract<
    import("../../KcContext").KcContext,
    { pageId: "webauthn-register.ftl" }
>;