import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { EyeOff, EyeIcon } from "lucide-react";
import useProviderLogos from "../useProviderLogos";

const providerLogos = useProviderLogos();
const header = () => {
    return (
        <CardHeader>
            <CardTitle id="card-title">Welcome back</CardTitle>
            <CardDescription id="card-description">Login with your email or a provider below</CardDescription>
        </CardHeader>
    );
};

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={header()}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <CardFooter>
                    <div id="kc-registration-container">
                        <div id="kc-registration">
                            <span>
                                {msgStr("noAccount")}{" "}
                                <a tabIndex={8} href={url.registrationUrl} className="underline hover:text-primary">
                                    Sign up here
                                </a>
                            </span>
                        </div>
                    </div>
                </CardFooter>
            }
            socialProvidersNode={
                social?.providers?.length ? (
                    <div className="mt-6">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">{msg("identity-provider-login-label")}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {social.providers.map(p => (
                                <a
                                    key={p.alias}
                                    href={p.loginUrl}
                                    className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    {providerLogos[p.alias] ? (
                                        <div className={"h-6 w-6"}>
                                            <img src={providerLogos[p.alias]} alt={`${p.displayName} logo`} className={"h-full w-auto"} />
                                        </div>
                                    ) : // Fallback to the original iconClasses if the logo is not defined
                                    p.iconClasses ? (
                                        <div className={"h-6 w-6"}>
                                            <i
                                                className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses, `text-provider-${p.alias}`)}
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                    ) : (
                                        <div className="h-6 mx-1 pt-1 font-bold">{p.displayName || p.alias}</div>
                                    )}
                                    <span dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }} />
                                </a>
                            ))}
                        </div>
                    </div>
                ) : null
            }
        >
            <CardContent>
                <div id="kc-form">
                    <div id="kc-form-wrapper">
                        {realm.password && (
                            <form
                                id="kc-form-login"
                                onSubmit={() => {
                                    setIsLoginButtonDisabled(true);
                                    return true;
                                }}
                                action={url.loginAction}
                                method="post"
                                className="space-y-6"
                            >
                                {!usernameHidden && (
                                    <div className="space-y-2">
                                        <Label htmlFor="username">
                                            {!realm.loginWithEmailAllowed
                                                ? msg("username")
                                                : !realm.registrationEmailAsUsername
                                                  ? msg("usernameOrEmail")
                                                  : msg("email")}
                                        </Label>
                                        <Input
                                            tabIndex={2}
                                            id="username"
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                        {messagesPerField.existsError("username", "password") && (
                                            <p
                                                id="input-error"
                                                className="text-sm text-destructive"
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                }}
                                            />
                                        )}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="password">{msg("password")}</Label>
                                    <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                        <Input
                                            tabIndex={3}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                    </PasswordWrapper>
                                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                                        <p
                                            id="input-error"
                                            className="text-sm text-destructive"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center gap-3">
                                                <Switch
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    className="data-[state=checked]:bg-primary dark:bg-primary"
                                                    defaultChecked={!!login.rememberMe}
                                                />
                                                <Label htmlFor="rememberMe" className="text-sm">
                                                    {msg("rememberMe")}
                                                </Label>
                                            </div>
                                        </div>
                                    )}
                                    {realm.resetPasswordAllowed && (
                                        <div>
                                            <a
                                                tabIndex={6}
                                                href={url.loginResetCredentialsUrl}
                                                className="text-sm text-muted-foreground hover:underline"
                                            >
                                                {msg("doForgotPassword")}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <div>
                                    <Button
                                        tabIndex={7}
                                        disabled={isLoginButtonDisabled}
                                        className="kc-primary w-full"
                                        name="login"
                                        id="kc-login"
                                        variant="default"
                                        type="submit"
                                    >
                                        <b>Login</b>
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </CardContent>
        </Template>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { i18n, passwordInputId, children } = props;
    const { msgStr } = i18n;
    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    return (
        <div className="relative">
            {children}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i  aria-hidden >
                    {isPasswordRevealed ? <EyeOff/> : <EyeIcon/>}
                </i>
            </Button>
        </div>
    );
}
