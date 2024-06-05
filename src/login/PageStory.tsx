import type { DeepPartial } from "keycloakify/tools/DeepPartial";
import type { KcContext } from "./kcContext";
import KcApp from "./KcApp";
import { createGetKcContextMock } from "keycloakify/login";
import type {
    KcContextExtraProperties,
    KcContextExtraPropertiesPerPage
} from "./kcContext";

const kcContextExtraProperties: KcContextExtraProperties = {};
const kcContextExtraPropertiesPerPage: KcContextExtraPropertiesPerPage = {};

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtraProperties,
    kcContextExtraPropertiesPerPage,
    overrides: {},
    overridesPerPage: {}
});

export function createPageStory<PageId extends KcContext["pageId"]>(params: { pageId: PageId }) {
    const { pageId } = params;

    function PageStory(props: { kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>> }) {
        const { kcContext: overrides } = props;

        const kcContextMock = getKcContextMock({
            pageId,
            overrides
        });

        return (
            <>
                <KcApp kcContext={kcContextMock} />
            </>
        );
    }

    return { PageStory };
}

