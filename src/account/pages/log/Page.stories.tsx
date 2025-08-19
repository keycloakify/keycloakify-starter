import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({
    pageId: "log.ftl"
});

const meta = {
    title: "account/log.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

// NOTE: Enable in your Keycloak realm with: https://github.com/user-attachments/assets/5fc5e49e-a172-4cb0-897a-49baac284b47
export const Default: Story = {
    args: {
        kcContext: {
            log: {
                events: [
                    {
                        date: "2024-04-26T12:29:08Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T12:10:56Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T11:57:34Z",
                        ipAddress: "127.0.0.1",
                        client: "account",
                        details: [],
                        event: "update totp"
                    },
                    {
                        date: "2024-04-26T11:57:21Z",
                        ipAddress: "127.0.0.1",
                        client: "account",
                        details: [],
                        event: "update totp"
                    },
                    {
                        date: "2024-04-26T11:56:56Z",
                        ipAddress: "127.0.0.1",
                        client: "account",
                        details: [],
                        event: "remove totp"
                    },
                    {
                        date: "2024-04-26T11:56:55Z",
                        ipAddress: "127.0.0.1",
                        client: "account",
                        details: [],
                        event: "remove totp"
                    },
                    {
                        date: "2024-04-26T11:56:41Z",
                        ipAddress: "127.0.0.1",
                        client: "account",
                        details: [],
                        event: "update totp"
                    },
                    {
                        date: "2024-04-26T11:56:36Z",
                        ipAddress: "127.0.0.1",
                        client: "account",
                        details: [],
                        event: "update totp"
                    },
                    {
                        date: "2024-04-26T11:32:54Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T09:42:54Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T09:42:52Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T09:42:40Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T09:42:09Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "false",
                                key: "remember_me"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T09:24:17Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [],
                        event: "logout"
                    },
                    {
                        date: "2024-04-26T09:23:54Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T09:23:50Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T09:23:47Z",
                        ipAddress: "127.0.0.1",
                        client: "account",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T09:23:15Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [],
                        event: "logout"
                    },
                    {
                        date: "2024-04-26T09:23:06Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T09:22:53Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [],
                        event: "logout"
                    },
                    {
                        date: "2024-04-26T09:21:29Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "false",
                                key: "remember_me"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-26T09:17:32Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-18T11:19:09Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-18T11:18:50Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    },
                    {
                        date: "2024-04-18T11:18:24Z",
                        ipAddress: "127.0.0.1",
                        client: "account",
                        details: [
                            {
                                value: "openid-connect",
                                key: "auth_method"
                            },
                            {
                                value: "john.doe",
                                key: "username"
                            }
                        ],
                        event: "login"
                    }
                ]
            }
        }
    }
};
export const LogsMissingDetails: Story = {
    args: {
        kcContext: {
            pageId: "log.ftl",
            log: {
                events: [
                    {
                        date: "2024-04-26T12:29:08Z",
                        ipAddress: "127.0.0.1",
                        client: "",
                        details: [],
                        event: "login"
                    }
                ]
            }
        }
    }
};
export const SingleLogEntry: Story = {
    args: {
        kcContext: {
            pageId: "log.ftl",
            log: {
                events: [
                    {
                        date: "2024-04-26T12:29:08Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            { key: "auth_method", value: "openid-connect" },
                            { key: "username", value: "john.doe" }
                        ],
                        event: "login"
                    }
                ]
            }
        }
    }
};
export const LogsWithLongDetails: Story = {
    args: {
        kcContext: {
            pageId: "log.ftl",
            log: {
                events: [
                    {
                        date: "2024-04-26T12:29:08Z",
                        ipAddress: "127.0.0.1",
                        client: "keycloakify-frontend",
                        details: [
                            { key: "auth_method", value: "openid-connect" },
                            { key: "username", value: "john.doe" },
                            {
                                key: "session_duration",
                                value: "2 hours 30 minutes 45 seconds"
                            },
                            { key: "location", value: "Windsor, Ontario, Canada" },
                            {
                                key: "user_agent",
                                value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
                            }
                        ],
                        event: "login"
                    }
                ]
            }
        }
    }
};
export const EmptyClientField: Story = {
    args: {
        kcContext: {
            pageId: "log.ftl",
            log: {
                events: [
                    {
                        date: "2024-04-26T12:29:08Z",
                        ipAddress: "127.0.0.1",
                        client: "", // Empty client field
                        details: [
                            { key: "auth_method", value: "openid-connect" },
                            { key: "username", value: "john.doe" }
                        ],
                        event: "login"
                    }
                ]
            }
        }
    }
};
export const NoLogsAvailable: Story = {
    args: {
        kcContext: {
            pageId: "log.ftl",
            log: {
                events: [] // No log events
            }
        }
    }
};
