
export type KcContext = Extract<
    import("../../KcContext").KcContext,
    { pageId: "error.ftl" }
>;