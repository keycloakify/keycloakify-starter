import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "applications.ftl" });

const meta = {
    title: "account/applications.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        kcContext: {
            pageId: "applications.ftl",
            applications: {
                applications: [
                    {
                        realmRolesAvailable: [
                            {
                                name: "realmRoleName1",
                                description: "realm role description 1"
                            },
                            {
                                name: "realmRoleName2",
                                description: "realm role description 2"
                            }
                        ],
                        resourceRolesAvailable: {
                            resource1: [
                                {
                                    roleName: "Resource Role Name 1",
                                    roleDescription: "Resource role 1 description",
                                    clientName: "Client Name 1",
                                    clientId: "client1"
                                }
                            ],
                            resource2: [
                                {
                                    roleName: "Resource Role Name 2",
                                    clientName: "Client Name 1",
                                    clientId: "client1"
                                }
                            ]
                        },
                        additionalGrants: ["grant1", "grant2"],
                        clientScopesGranted: ["scope1", "scope2"],
                        effectiveUrl: "#",
                        client: {
                            clientId: "application1",
                            name: "Application 1",
                            consentRequired: true
                        }
                    },
                    {
                        realmRolesAvailable: [
                            {
                                name: "Realm Role Name 1"
                            }
                        ],
                        resourceRolesAvailable: {},
                        additionalGrants: [],
                        clientScopesGranted: [],
                        effectiveUrl: "#",
                        client: {
                            clientId: "application2",
                            name: "Application 2"
                        }
                    }
                ]
            }
        }
    }
};

// No Available Roles or Grants Scenario
export const NoAvailableRolesOrGrants: Story = {
    args: {
        kcContext: {
            pageId: "applications.ftl",
            applications: {
                applications: [
                    {
                        realmRolesAvailable: [],
                        resourceRolesAvailable: {},
                        additionalGrants: [],
                        clientScopesGranted: [],
                        effectiveUrl: "#",
                        client: {
                            clientId: "application1",
                            name: "Application 1",
                            consentRequired: true
                        }
                    }
                ]
            }
        }
    }
};

// Consent Not Required Scenario
export const ConsentNotRequired: Story = {
    args: {
        kcContext: {
            pageId: "applications.ftl",
            applications: {
                applications: [
                    {
                        realmRolesAvailable: [],
                        resourceRolesAvailable: {},
                        additionalGrants: [],
                        clientScopesGranted: [],
                        effectiveUrl: "#",
                        client: {
                            clientId: "application1",
                            name: "Application 1",
                            consentRequired: false // No consent required
                        }
                    }
                ]
            }
        }
    }
};

// No Roles Available but Consent Required Scenario
export const NoRolesButConsentRequired: Story = {
    args: {
        kcContext: {
            pageId: "applications.ftl",
            applications: {
                applications: [
                    {
                        realmRolesAvailable: [],
                        resourceRolesAvailable: {},
                        additionalGrants: [],
                        clientScopesGranted: ["scope1", "scope2"], // Consent required but no roles
                        effectiveUrl: "#",
                        client: {
                            clientId: "application1",
                            name: "Application 1",
                            consentRequired: true
                        }
                    }
                ]
            }
        }
    }
};

// Only Resource Roles Available Scenario
export const OnlyResourceRolesAvailable: Story = {
    args: {
        kcContext: {
            pageId: "applications.ftl",
            applications: {
                applications: [
                    {
                        realmRolesAvailable: [], // No realm roles
                        resourceRolesAvailable: {
                            resource1: [
                                {
                                    roleName: "Resource Role Name 1",
                                    roleDescription: "Resource role 1 description",
                                    clientName: "Client Name 1",
                                    clientId: "client1"
                                }
                            ]
                        },
                        additionalGrants: [],
                        clientScopesGranted: [],
                        effectiveUrl: "#",
                        client: {
                            clientId: "application1",
                            name: "Application 1",
                            consentRequired: true
                        }
                    }
                ]
            }
        }
    }
};

// No Additional Grants Scenario
export const NoAdditionalGrants: Story = {
    args: {
        kcContext: {
            pageId: "applications.ftl",
            applications: {
                applications: [
                    {
                        realmRolesAvailable: [
                            {
                                name: "Realm Role Name 1"
                            }
                        ],
                        resourceRolesAvailable: {},
                        additionalGrants: [], // No additional grants
                        clientScopesGranted: [],
                        effectiveUrl: "#",
                        client: {
                            clientId: "application1",
                            name: "Application 1",
                            consentRequired: true
                        }
                    }
                ]
            }
        }
    }
};
