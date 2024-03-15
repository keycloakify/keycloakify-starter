import { createGetKcContext } from "keycloakify/login";

export type KcContextExtension =
  | { pageId: "login.ftl" }
  // NOTE: register.ftl is deprecated in favor of register-user-profile.ftl
  // but let's say we use it anyway and have this plugin enabled: https://github.com/micedre/keycloak-mail-whitelisting
  // keycloak-mail-whitelisting define the non standard ftl global authorizedMailDomains, we declare it here.
  | { pageId: "register.ftl"; authorizedMailDomains: string[] };

//NOTE: In most of the cases you do not need to overload the KcContext, you can
// just call createGetKcContext(...) without type arguments.
// You want to overload the KcContext only if:
// - You have custom plugins that add some values to the context (like https://github.com/micedre/keycloak-mail-whitelisting that adds authorizedMailDomains)
// - You want to add support for extra pages that are not yey featured by default, see: https://docs.keycloakify.dev/contributing#adding-support-for-a-new-page
export const { getKcContext } = createGetKcContext<KcContextExtension>({
  mockData: [
    {
      pageId: "info.ftl",
      messageHeader: "Testing Header",
      message: {
        type: "error",
        summary: "Testing summary",
      },
      requiredActions: ["CONFIGURE_RECOVERY_AUTHN_CODES", "VERIFY_EMAIL"],
    },
    {
      pageId: "login.ftl",
      // locale: {
      //   //When we test the login page we do it in french
      //   currentLanguageTag: "fr",
      // },
      //Uncomment the following line for hiding the Alert message
      //"message": undefined
      //Uncomment the following line for showing an Error message
      //message: { type: "error", summary: "This is an error" }
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: "/testing",
            alias: "google",
            providerId: "Google",
            displayName: "Google",
          },
          {
            loginUrl: "/testing",
            alias: "microsoft",
            providerId: "Microsoft",
            displayName: "Microsoft",
          },
        ],
      },
    },
    {
      pageId: "register.ftl",
      authorizedMailDomains: [
        "example.com",
        "another-example.com",
        "*.yet-another-example.com",
        "*.example.com",
        "hello-world.com",
      ],
      // Simulate we got an error with the email field
      messagesPerField: {
        printIfExists: <T>(fieldName: string, className: T) => {
          console.log({ fieldName });
          return fieldName === "email" ? className : undefined;
        },
        existsError: (fieldName: string) => fieldName === "email",
        get: (fieldName: string) => `Fake error for ${fieldName}`,
        exists: (fieldName: string) => fieldName === "email",
      },
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: "/testing",
            alias: "google",
            providerId: "Google",
            displayName: "Google",
          },
          {
            loginUrl: "/testing",
            alias: "microsoft",
            providerId: "Microsoft",
            displayName: "Microsoft",
          },
        ],
      },
    },
  ],
});

export const { kcContext } = getKcContext({
  // Uncomment to test the login page for development.
  mockPageId: "register.ftl",
});

export type KcContext = NonNullable<
  ReturnType<typeof getKcContext>["kcContext"]
>;
