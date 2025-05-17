
export type KcContext = Extract<
    import("../../KcContext").KcContext,
    { pageId: "code.ftl" }
>;