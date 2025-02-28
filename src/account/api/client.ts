import { getOidc } from "../oidc";
import { parseKeycloakIssuerUri } from "oidc-spa/tools/parseKeycloakIssuerUri";
import type { Attribute } from "keycloakify/login/KcContext/KcContext";

export type UserProfile = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    attributes: Record<string, string[]>;
    userProfileMetadata: {
        attributes: Attribute[];
        groups: {
            name: string;
            displayHeader: string;
            displayDescription: string;
        }[];
    };
};

const userProfileMock: UserProfile = {
    id: "d93e1772-4916-4243-850f-a6d9b2615716",
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "testuser@gmail.com",
    emailVerified: true,
    attributes: {
        favourite_pet: ["cat"],
        locale: ["en"]
    },
    userProfileMetadata: {
        attributes: [
            {
                name: "locale",
                displayName: "locale",
                required: false,
                readOnly: false,
                validators: {},
                multivalued: false,
                annotations: {}
            },
            {
                name: "username",
                displayName: "${username}",
                required: true,
                readOnly: true,
                validators: {
                    multivalued: {
                        max: "1"
                    },
                    length: {
                        max: 255,
                        "ignore.empty.value": true,
                        min: 3
                    }
                },
                multivalued: false,
                annotations: {}
            },
            {
                name: "email",
                displayName: "${email}",
                required: true,
                readOnly: false,
                validators: {
                    multivalued: {
                        max: "1"
                    },
                    length: {
                        max: 255,
                        "ignore.empty.value": true
                    },
                    email: {
                        "ignore.empty.value": true
                    }
                },
                multivalued: false,
                annotations: {}
            },
            {
                name: "firstName",
                displayName: "${firstName}",
                required: true,
                readOnly: false,
                validators: {
                    multivalued: {
                        max: "1"
                    },
                    length: {
                        max: 255,
                        "ignore.empty.value": true
                    }
                },
                multivalued: false,
                annotations: {}
            },
            {
                name: "lastName",
                displayName: "${lastName}",
                required: true,
                readOnly: false,
                validators: {
                    multivalued: {
                        max: "1"
                    },
                    length: {
                        max: 255,
                        "ignore.empty.value": true
                    }
                },
                multivalued: false,
                annotations: {}
            },
            {
                name: "favourite_pet",
                displayName: "${profile.attributes.favourite_pet}",
                required: true,
                readOnly: false,
                annotations: {
                    inputType: "select",
                    inputOptionLabelsI18nPrefix: "profile.attributes.favourite_pet"
                },
                validators: {
                    multivalued: {
                        max: "1"
                    },
                    options: {
                        options: ["cat", "dog", "bird"]
                    }
                },
                multivalued: false
            }
        ],
        groups: [
            {
                name: "user-metadata",
                displayHeader: "User metadata",
                displayDescription: "Attributes, which refer to user metadata"
            }
        ]
    }
};

export async function getUserProfile(): Promise<UserProfile> {
    if (import.meta.env.DEV) {
        return userProfileMock;
    }

    const oidc = await getOidc();

    const { accessToken } = await oidc.getTokens();

    const { kcHttpRelativePath, realm } = parseKeycloakIssuerUri(
        oidc.params.issuerUri
    )!;

    return fetch(
        `${kcHttpRelativePath ?? ""}/realms/${realm}/account/?userProfileMetadata=true`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        }
    ).then(r => r.json());
}

export type I18nMessages = Record<string, string>;

const i18nMessagesMock: I18nMessages = {
    username: "Username",
    email: "Email",
    firstName: "First name",
    lastName: "Last name",
    "profile.attributes.favourite_pet": "Favourite pet",
    "profile.attributes.favourite_pet.cat": "Cat",
    "profile.attributes.favourite_pet.dog": "Dog",
    "profile.attributes.favourite_pet.bird": "Bird"
};

export async function getI18nMessages(): Promise<I18nMessages> {
    if (import.meta.env.DEV) {
        return i18nMessagesMock;
    }

    const userProfile_preI18n = await getUserProfile();

    const languageTag = userProfile_preI18n.attributes.locale?.[0] ?? "en";

    const { kcHttpRelativePath, realm } = parseKeycloakIssuerUri(
        (await getOidc()).params.issuerUri
    )!;

    const data: { key: string; value: string }[] = await fetch(
        `${kcHttpRelativePath ?? ""}/resources/${realm}/account/${languageTag}`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(r => r.json());

    return Object.fromEntries(data.map(({ key, value }) => [key, value]));
}
