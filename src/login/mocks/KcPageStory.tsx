// NOTE: This is not a file that you typically want to modify.

import type { DeepPartial } from "../../@keycloakify/login-ui/tools/DeepPartial";
import { getKcContextMock } from "./getKcContextMock.gen";
import type { KcContext } from "../KcContext.gen";
import KcPage from "../KcPage";
export type { Meta, StoryObj } from "../../kc.gen";

export function createKcPageStory<PageId extends KcContext["pageId"]>(params: { pageId: PageId }) {
    const { pageId } = params;

    function KcPageStory(props: { kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>> }) {
        const { kcContext: overrides } = props;

        const kcContextMock = getKcContextMock({
            pageId,
            overrides
        });

        return <KcPage kcContext={kcContextMock} />;
    }

    return { KcPageStory };
}
