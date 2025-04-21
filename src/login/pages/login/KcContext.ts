
export type KcContext = Extract<
    import("../../KcContext").KcContext,
    { pageId: "login.ftl" }
>;