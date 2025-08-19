import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "federatedIdentity.ftl" });

const meta = {
    title: "account/federatedIdentity.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NotConnected: Story = {
    args: {
        kcContext: {
            pageId: "federatedIdentity.ftl",
            federatedIdentity: {
                identities: [
                    {
                        providerId: "google",
                        displayName: "keycloak-oidc",
                        connected: false
                    }
                ],
                removeLinkPossible: true
            }
        }
    }
};

/**
 * RemoveLinkNotPossible:
 * - Federated identities are connected, but the user cannot remove them due to restrictions.
 */
export const RemoveLinkNotPossible: Story = {
    args: {
        kcContext: {
            pageId: "federatedIdentity.ftl",
            federatedIdentity: {
                identities: [
                    {
                        providerId: "google",
                        displayName: "Google",
                        userName: "john.doe@gmail.com",
                        connected: true
                    }
                ],
                removeLinkPossible: false
            },
            stateChecker: "1234",
            url: {
                socialUrl: "/social"
            }
        }
    }
};

/**
 * AddLinkForUnconnectedIdentity:
 * - The user has an identity that is not connected and can add it.
 */
export const AddLinkForUnconnectedIdentity: Story = {
    args: {
        kcContext: {
            pageId: "federatedIdentity.ftl",
            federatedIdentity: {
                identities: [
                    {
                        providerId: "github",
                        displayName: "GitHub",
                        userName: "",
                        connected: false
                    }
                ],
                removeLinkPossible: true
            },
            stateChecker: "1234",
            url: {
                socialUrl: "/social"
            }
        }
    }
};
