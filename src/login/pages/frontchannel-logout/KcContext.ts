
export type KcContext = Extract<
    import("../../KcContext").KcContext,
    { pageId: "frontchannel-logout.ftl" }
>;