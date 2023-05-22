import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

const my_custom_param = new URL(window.location.href).searchParams.get("my_custom_param");

if (my_custom_param !== null) {
    console.log("my_custom_param:", my_custom_param);
}

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameEditDisabled, login, auth, registrationDisabled } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayInfo={
                realm.password &&
                realm.registrationAllowed &&
                !registrationDisabled
            }
            displayWide={realm.password && social.providers !== undefined}
            headerNode={
                <div>
                    <div className="flex justify-center pb-8">
                        <img src={require("./../assets/logo-dark.png")} className="h-12 w-12" />
                    </div>
                    <h1 >Meet BuildBetter</h1>
                    <p className="text-center">Give your product operations superpowers.</p>
                </div>
            }
            infoNode={
                realm.password &&
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <div id="kc-registration" className="instruction">
                        <div className={clsx(getClassName("kcFormButtonsClass"), "!p-0")}>
                            <button onClick={() => window.location.href = url.registrationUrl} className={"btn-primary !h-11 w-full"}>
                                {msg("doRegister")}
                            </button>
                        </div>
                    </div>
                )
            }
        >
            <div id="kc-form" className={clsx(realm.password && social.providers !== undefined && getClassName("kcContentWrapperClass"))}>
                <div
                    id="kc-form-wrapper"
                    className={clsx(
                        realm.password &&
                        social.providers && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                    )}
                >
                    {realm.password && (
                        <form id="kc-form-login" className={getClassName("kcFormClass")} onSubmit={onSubmit} action={url.loginAction} method="post">
                            <div className={getClassName("kcFormGroupClass")}>
                                {!usernameEditDisabled &&
                                    (() => {
                                        const label = !realm.loginWithEmailAllowed
                                            ? "username"
                                            : realm.registrationEmailAsUsername
                                                ? "email"
                                                : "usernameOrEmail";

                                        const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;

                                        return (
                                            <>
                                                <input
                                                    tabIndex={1}
                                                    id={autoCompleteHelper}
                                                    className={getClassName("kcInputClass")}
                                                    //NOTE: This is used by Google Chrome auto fill so we use it to tell
                                                    //the browser how to pre fill the form but before submit we put it back
                                                    //to username because it is what keycloak expects.
                                                    name={autoCompleteHelper}
                                                    defaultValue={login.username ?? ""}
                                                    type="text"
                                                    placeholder="Email Address"
                                                    {...(usernameEditDisabled
                                                        ? { "disabled": true }
                                                        : {
                                                            "autoFocus": true,
                                                            "autoComplete": "off"
                                                        })}
                                                />
                                            </>
                                        );
                                    })()}
                            </div>
                            <div className={getClassName("kcFormGroupClass")}>
                                <input
                                    tabIndex={2}
                                    id="password"
                                    className={getClassName("kcInputClass")}
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Password"
                                />
                            </div>
                            <div className={clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass"))}>
                                <div className={getClassName("kcFormOptionsWrapperClass")}>
                                    {realm.rememberMe && !usernameEditDisabled && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={3}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    {...(login.rememberMe === "on"
                                                        ? {
                                                            "checked": true
                                                        }
                                                        : {})}
                                                />
                                                {msg("rememberMe")}
                                            </label>
                                        </div>
                                    )}
                                    <div className="mb-1">
                                        {realm.resetPasswordAllowed && (
                                            <span>
                                                <svg viewBox="0 0 20 19" focusable="false" className="h-4 mr-1"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.29749 8.56792C8.29749 7.50738 9.09098 6.73624 9.94018 6.73624C10.8284 6.73624 11.5829 7.54841 11.5829 8.36145V9.58237H8.29749V8.56792ZM6.79749 9.70692V8.56792C6.79749 6.78837 8.15722 5.23624 9.94018 5.23624C11.6839 5.23624 13.0829 6.74734 13.0829 8.36145V9.70677C14.5313 10.1094 15.6007 11.4422 15.6007 13.0156V15.4841C15.6007 17.3738 14.0576 18.9173 12.1675 18.9173H7.71348C5.82335 18.9173 4.28027 17.374 4.28027 15.4841V13.0156C4.28027 11.4424 5.34922 10.1097 6.79749 9.70692ZM5.78027 13.0156C5.78027 11.9539 6.65181 11.0824 7.71348 11.0824H12.1675C13.229 11.0824 14.1007 11.9539 14.1007 13.0156V15.4841C14.1007 16.5455 13.2291 17.4173 12.1675 17.4173H7.71348C6.65184 17.4173 5.78027 16.5456 5.78027 15.4841V13.0156Z" fill="currentColor"></path><path d="M18.8084 7.91959C17.8455 3.94868 14.2671 1 10.0004 1C5.73318 1 2.15495 3.94892 1.19238 7.91967V2.04475" fill="None" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                                                    Forgot Password?
                                                </a>
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <span>
                                            <svg viewBox="0 0 20 20" focusable="false" className="h-4 mr-1"><path d="M10 20C12.6521 20 15.1957 18.9465 17.071 17.071C18.9464 15.1957 20 12.6522 20 10C20 7.3478 18.9465 4.80434 17.071 2.92896C15.1957 1.05356 12.6522 0 10 0C7.3478 0 4.80434 1.05352 2.92896 2.92896C1.05356 4.80426 0 7.3478 0 10C0.00335706 12.651 1.05804 15.1927 2.93259 17.0673C4.80729 18.9418 7.34881 19.9966 9.99989 19.9999L10 20ZM10 1.95249C12.1336 1.95249 14.1801 2.80009 15.6889 4.30872C17.1978 5.81735 18.0455 7.86356 18.0457 9.99724C18.0458 12.1309 17.1985 14.1773 15.6899 15.6861C14.1814 17.1951 12.1352 18.0429 10.0018 18.0434C7.868 18.0437 5.82131 17.1965 4.31249 15.688C2.80342 14.1797 1.95541 12.1335 1.95481 9.99989C1.957 7.8667 2.80547 5.82169 4.3138 4.31324C5.82213 2.8048 7.86718 1.95645 10.0004 1.95425L10 1.95249ZM10.9102 14.9007C10.9102 15.1748 10.8013 15.4379 10.6075 15.6317C10.4136 15.8255 10.1506 15.9344 9.87652 15.9344C9.60241 15.9344 9.33954 15.8255 9.14558 15.6317C8.95175 15.4378 8.84286 15.1748 8.84286 14.9007C8.84286 14.6266 8.95175 14.3636 9.14558 14.1698C9.33956 13.976 9.60245 13.8671 9.87652 13.8671C10.1511 13.8671 10.4142 13.9763 10.6082 14.1705C10.8022 14.3648 10.9108 14.6284 10.9102 14.9028L10.9102 14.9007ZM6.65202 6.84475C6.56167 6.58786 6.57743 6.30542 6.69595 6.06008C6.97882 5.4663 7.42327 4.96422 7.97849 4.61157C8.5337 4.25879 9.17694 4.06977 9.83465 4.06596H9.85567C10.7734 4.06961 11.6543 4.42794 12.3141 5.06593C12.9739 5.70376 13.3616 6.5721 13.396 7.48927C13.4195 8.24184 13.2 8.98198 12.77 9.59997C12.34 10.2181 11.7223 10.6812 11.0086 10.9209C11.0086 10.9209 10.9061 10.9565 10.9061 11.0171V11.8374H10.906C10.906 12.2048 10.7101 12.5443 10.3917 12.728C10.0736 12.9118 9.6815 12.9118 9.36334 12.728C9.04515 12.5443 8.84911 12.2048 8.84911 11.8374V11.0171C8.85379 10.5626 9.00077 10.1208 9.26948 9.75411C9.53833 9.38731 9.91519 9.11407 10.3474 8.97279C10.6449 8.87194 10.902 8.67825 11.081 8.4202C11.2599 8.16214 11.3512 7.85329 11.3412 7.53949C11.3211 7.15941 11.1573 6.80123 10.8831 6.5375C10.6088 6.27375 10.2445 6.12402 9.86399 6.11875C9.58944 6.12167 9.32133 6.20165 9.09011 6.34966C8.85892 6.49766 8.67383 6.70769 8.5562 6.95569C8.43914 7.20484 8.22706 7.39648 7.96739 7.48784C7.70774 7.57921 7.42238 7.56257 7.17514 7.44172C6.92788 7.32087 6.73945 7.10587 6.65202 6.84473V6.84475Z" fill="currentColor"></path></svg>
                                            <a href="mailto:support@buildbetter.ai" target="_blank" rel="noreferrer">Having trouble? Contact us</a>
                                        </span>
                                    </div>
                                </div>
                                <div id="kc-form-buttons" className={clsx(getClassName("kcFormButtonsClass"), 'flex justify-start !ml-auto float-none w-auto !mt-0 !p-0')}>
                                    <input
                                        type="hidden"
                                        id="id-hidden-input"
                                        name="credentialId"
                                        {...(auth?.selectedCredential !== undefined
                                            ? {
                                                "value": auth.selectedCredential
                                            }
                                            : {})}
                                    />
                                    <input
                                        tabIndex={4}
                                        className={clsx(
                                            getClassName("kcButtonClass"),
                                            getClassName("kcButtonPrimaryClass"),
                                            getClassName("kcButtonBlockClass"),
                                            getClassName("kcButtonLargeClass"),
                                            '!mt-0 !h-11'
                                        )}
                                        name="login"
                                        id="kc-login"
                                        type="submit"
                                        value={msgStr("doLogIn")}
                                        disabled={isLoginButtonDisabled}
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                </div>
                {realm.password && social.providers !== undefined && (
                    <div
                        id="kc-social-providers"
                        className={clsx(getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass"))}
                    >
                        <ul
                            className={clsx(
                                getClassName("kcFormSocialAccountListClass"),
                                social.providers.length > 4 && getClassName("kcFormSocialAccountDoubleListClass")
                            )}
                        >
                            {social.providers.map(p => (
                                <li key={p.providerId} className={getClassName("kcFormSocialAccountListLinkClass")}>
                                    <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx("zocial", p.providerId)}>
                                        <span>{p.displayName}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Template>
    );
}
