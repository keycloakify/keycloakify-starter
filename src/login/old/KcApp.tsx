// import "./KcApp.css";
// import { lazy, Suspense } from "react";
// import Fallback, { type PageProps } from "keycloakify/login";
// import type { KcContext } from "./kcContext";
// import { useI18n } from "./i18n";
// import Template from "./Template";

// const BobLogin = lazy(() => import("./pages/BobLogin"));
// const Login = lazy(() => import("./pages/Login"));
// const LoginOtp = lazy(() => import("./pages/LoginOtp"));
// // If you can, favor register-user-profile.ftl over register.ftl, see: https://docs.keycloakify.dev/realtime-input-validation
// const Register = lazy(() => import("./pages/Register"));
// const RegisterUserProfile = lazy(() => import("./pages/RegisterUserProfile"));
// const Terms = lazy(() => import("./pages/Terms"));
// const MyExtraPage1 = lazy(() => import("./pages/MyExtraPage1"));
// const MyExtraPage2 = lazy(() => import("./pages/MyExtraPage2"));
// const Info = lazy(() => import("keycloakify/login/pages/Info"));

// // This is like adding classes to theme.properties
// // https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
// const classes = {
//   // NOTE: The classes are defined in ./KcApp.css
//   kcHtmlClass: "my-root-class",
//   kcHeaderWrapperClass: "my-color my-font",
//   kcButtonPrimaryClass: "bob-button",
//   kcFormCardClass: "bob-card",
//   kcLoginClass: "bob-login",
//   kcFormHeaderClass: "bob-cardheader",
//   kcHeaderClass: "bob-header",
//   kcContentWrapperClass: "bob-content-wrapper",
//   kcContentClass: "bob-content",
//   kcSignUpClass: "bob-signup",
//   kcInfoAreaWrapperClass: "bob-info-area-wrapper",
//   kcFormSocialAccountListLinkClass: "bob-link",
//   kcContainerClass: "bob-background",
//   kcFormSocialAccountContentClass: "bob-form-content-wrapper",
//   kcInputClass: "bob-input",
// } satisfies PageProps["classes"];

// export default function KcApp(props: { kcContext: KcContext }) {
//   const { kcContext } = props;

//   const i18n = useI18n({ kcContext });

//   if (i18n === null) {
//     //NOTE: Text resources for the current language are still being downloaded, we can't display anything yet.
//     //We could display a loading progress but it's usually a matter of milliseconds.
//     return null;
//   }

//   /*
//    * Examples assuming i18n.currentLanguageTag === "en":
//    * i18n.msg("access-denied") === <span>Access denied</span>
//    * i18n.msg("foo") === <span>foo in English</span>
//    */

//   return (
//     <Suspense>
//       {(() => {
//         switch (kcContext.pageId) {
//           case "email-code-form.ftl":
//             return (
//               <BobLogin
//                 {...{ kcContext, i18n, Template, classes }}
//                 doUseDefaultCss={true}
//               />
//             );
//           case "login.ftl":
//             return (
//               <Login
//                 {...{ kcContext, i18n, Template, classes }}
//                 doUseDefaultCss={true}
//               />
//             );
//           case "login-otp.ftl":
//             return (
//               <LoginOtp
//                 {...{ kcContext, i18n, Template, classes }}
//                 doUseDefaultCss={true}
//               />
//             );
//           case "register.ftl":
//             return (
//               <Register
//                 {...{ kcContext, i18n, Template, classes }}
//                 doUseDefaultCss={true}
//               />
//             );
//           case "register-user-profile.ftl":
//             return (
//               <RegisterUserProfile
//                 {...{ kcContext, i18n, Template, classes }}
//                 doUseDefaultCss={true}
//               />
//             );
//           case "terms.ftl":
//             return (
//               <Terms
//                 {...{ kcContext, i18n, Template, classes }}
//                 doUseDefaultCss={true}
//               />
//             );
//           // Removes those pages in you project. They are included to show you how to implement keycloak pages
//           // that are not yes implemented by Keycloakify.
//           // See: https://docs.keycloakify.dev/limitations#some-pages-still-have-the-default-theme.-why
//           case "my-extra-page-1.ftl":
//             return (
//               <MyExtraPage1
//                 {...{ kcContext, i18n, Template, classes }}
//                 doUseDefaultCss={true}
//               />
//             );
//           case "my-extra-page-2.ftl":
//             return (
//               <MyExtraPage2
//                 {...{ kcContext, i18n, Template, classes }}
//                 doUseDefaultCss={true}
//               />
//             );
//           // We choose to use the default Template for the Info page and to download the theme resources.
//           // This is just an example to show you what is possible. You likely don't want to keep this as is.
//           case "info.ftl":
//             return (
//               <Info
//                 {...{ kcContext, i18n, classes }}
//                 Template={lazy(() => import("keycloakify/login/Template"))}
//                 doUseDefaultCss={true}
//               />
//             );
//           default:
//             return (
//               <Fallback
//                 {...{ kcContext, i18n, classes }}
//                 Template={Template}
//                 doUseDefaultCss={true}
//               />
//             );
//         }
//       })()}
//     </Suspense>
//   );
// }
