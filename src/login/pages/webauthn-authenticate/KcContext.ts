
export type KcContext = Extract<
    import("../../KcContext").KcContext,
    { pageId: "webauthn-authenticate.ftl" }
>;