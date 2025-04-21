
export type KcContext = Extract<
    import("../../KcContext").KcContext,
    { pageId: "info.ftl" }
>;