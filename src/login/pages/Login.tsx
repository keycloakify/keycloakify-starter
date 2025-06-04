import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import React from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;
    const { realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField, social } = kcContext;
    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">{msg("loginAccountTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Login form */}
                    <form
                        onSubmit={() => {
                            // Disable login button on submit to prevent multiple submits
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                        className="space-y-4"
                    >
                        {/* Username input, shown if username is not hidden */}
                        {!usernameHidden && (
                            <div>
                                <Label htmlFor="username">
                                    {!realm.loginWithEmailAllowed
                                        ? msg("username")
                                        : !realm.registrationEmailAsUsername
                                        ? msg("usernameOrEmail")
                                        : msg("email")}
                                </Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    defaultValue={login.username ?? ""}
                                    autoFocus
                                    autoComplete="username"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                />
                                {/* Display username or password errors */}
                                {messagesPerField.existsError("username", "password") && (
                                    <p
                                        className="text-sm text-destructive mt-1"
                                        dangerouslySetInnerHTML={{ __html: messagesPerField.getFirstError("username", "password") }}
                                    />
                                )}
                            </div>
                        )}

                        {/* Password input with toggle */}
                        <div>
                            <Label htmlFor="password">{msg("password")}</Label>
                            <PasswordWrapper passwordInputId="password" i18n={i18n}>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                />
                            </PasswordWrapper>
                            {/* Display errors when username is hidden */}
                            {usernameHidden && messagesPerField.existsError("username", "password") && (
                                <p
                                    className="text-sm text-destructive mt-1"
                                    dangerouslySetInnerHTML={{ __html: messagesPerField.getFirstError("username", "password") }}
                                />
                            )}
                        </div>

                        {/* Remember me checkbox and forgot password link */}
                        <div className="flex items-center justify-between">
                            {realm.rememberMe && !usernameHidden && (
                                <label className="flex items-center space-x-2 text-sm">
                                    <input type="checkbox" name="rememberMe" defaultChecked={!!login.rememberMe} />
                                    <span>{msg("rememberMe")}</span>
                                </label>
                            )}
                            {realm.resetPasswordAllowed && (
                                <a href={url.loginResetCredentialsUrl} className="text-sm text-muted-foreground hover:underline">
                                    {msg("doForgotPassword")}
                                </a>
                            )}
                        </div>

                        {/* Hidden input for credentialId */}
                        <input type="hidden" name="credentialId" value={auth.selectedCredential} />

                        {/* Submit button */}
                        <Button type="submit" className="w-full" disabled={isLoginButtonDisabled}>
                            {msgStr("doLogIn")}
                        </Button>
                    </form>

                    {/* Social login providers section, if available */}
                    {social?.providers?.length > 0 && (
                        <>
                            {/* Separator line with label */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-muted-foreground" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase text-muted-foreground">
                                    <span className="bg-muted px-2">{msg("identity-provider-login-label")}</span>
                                </div>
                            </div>

                            {/* Grid of social provider buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {social.providers.map((provider) => (
                                    <a
                                        key={provider.alias}
                                        href={provider.loginUrl}
                                        className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {/* Provider icon if present */}
                                        {provider.iconClasses && (
                                            <i className={`${provider.iconClasses} text-lg`} aria-hidden="true" />
                                        )}
                                        {/* Provider display name safely inserted */}
                                        <span dangerouslySetInnerHTML={{ __html: provider.displayName }} />
                                    </a>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Registration link if allowed */}
                    {realm.registrationAllowed && !registrationDisabled && (
                        <p className="mt-4 text-center text-sm">
                            {msg("noAccount")}{" "}
                            <a href={url.registrationUrl} className="underline hover:text-primary">
                                {msg("doRegister")}
                            </a>
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function PasswordWrapper({
    passwordInputId,
    i18n,
    children,
}: {
    passwordInputId: string;
    i18n: I18n;
    children: React.ReactNode;
}) {
    const { msgStr } = i18n;
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div className="relative">
            {/* Clone child input to toggle type between password/text */}
            {children && React.cloneElement(children as React.ReactElement, { type: isRevealed ? "text" : "password" })}

            {/* Toggle button to show/hide password */}
            <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                aria-label={msgStr(isRevealed ? "hidePassword" : "showPassword")}
                onClick={() => setIsRevealed((prev) => !prev)}
            >
                {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
}
