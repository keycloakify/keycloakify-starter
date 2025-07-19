/**
 * This file has been claimed for ownership from @keycloakify/login-ui-storybook version 250004.0.5.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/mocks/KcPageStory.tsx" --revert
 */

// NOTE: This is not a file that you typically want to modify.

import type { DeepPartial } from "../../@keycloakify/login-ui/tools/DeepPartial";
import { getKcContextMock } from "./getKcContextMock";
import type { KcContext } from "../KcContext";
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
