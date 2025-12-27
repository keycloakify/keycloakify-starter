import { useState, useEffect, useReducer } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { assert } from "keycloakify/tools/assert";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode="Welkom terug"
            displayInfo={false}
                    socialProvidersNode={
                        <>
                            {realm.password && (
                                <>
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t" style={{borderColor: 'var(--color-border)'}}></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2" style={{backgroundColor: 'var(--color-beige-dark)', color: 'var(--color-text-tertiary)'}}>of</span>
                                        </div>
                                    </div>

                                    <div>
                                        {social?.providers !== undefined && social.providers.length !== 0 ? (
                                            social.providers.map((p) => (
                                                <a
                                                    key={p.alias}
                                                    id={`social-${p.alias}`}
                                                    className={`w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-lg transition-colors no-underline hover:no-underline ${p.alias === 'google' ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}
                                                    style={{borderColor: 'var(--color-border)', backgroundColor: 'transparent'}}
                                                    href={p.alias === 'google' ? '#' : p.loginUrl}
                                                    onClick={p.alias === 'google' ? (e) => e.preventDefault() : undefined}
                                                    aria-disabled={p.alias === 'google'}
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                    </svg>
                                                    <span className="text-lg font-medium" style={{color: 'var(--color-text-primary)'}}>Inloggen met Google</span>
                                                </a>
                                            ))
                                        ) : (
                                            <a
                                                className="w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-lg no-underline hover:no-underline pointer-events-none opacity-50 cursor-not-allowed"
                                                style={{borderColor: 'var(--color-border)', backgroundColor: 'transparent'}}
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                                aria-disabled
                                            >
                                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                </svg>
                                                <span className="text-lg font-medium" style={{color: 'var(--color-text-primary)'}}>Inloggen met Google</span>
                                            </a>
                                        )}
                                    </div>
                                </>
                            )}
                        </>
                    }
        >
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
                            className="space-y-5"
                        >
                            {!usernameHidden && (
                                <div className="form-group">
                                    <label htmlFor="username" className="block text-sm font-medium mb-2" style={{color: 'var(--color-text-primary)'}}>
                                        E-mailadres
                                    </label>
                                    <input
                                        tabIndex={2}
                                        id="username"
                                        className="w-full px-4 py-3 rounded-lg border focus:outline-none"
                                        style={{borderColor: 'var(--color-border)', backgroundColor: 'var(--color-beige)'} as React.CSSProperties}
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                    {messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className="text-red-600 text-sm mt-1 block"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="password" className="block text-sm font-medium mb-2" style={{color: 'var(--color-text-primary)'}}>
                                    Wachtwoord
                                </label>
                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                    <input
                                        tabIndex={3}
                                        id="password"
                                        className="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none"
                                        style={{borderColor: 'var(--color-border)', backgroundColor: 'var(--color-beige)'} as React.CSSProperties}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                </PasswordWrapper>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className="text-red-600 text-sm mt-1 block"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>

                            <div className="pt-2">
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <div className="flex items-center justify-between mb-3">
                                    {realm.rememberMe && !usernameHidden ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                tabIndex={5}
                                                id="rememberMe"
                                                name="rememberMe"
                                                type="checkbox"
                                                defaultChecked={!!login.rememberMe}
                                                className="custom-checkbox"
                                            />
                                            <label htmlFor="rememberMe" className="text-sm font-normal remember-label" style={{color: 'var(--color-text-primary)'}}>
                                                Ingelogd blijven
                                            </label>
                                        </div>
                                    ) : <div />}

                                    {realm.resetPasswordAllowed ? (
                                        <div className="text-right">
                                            <a tabIndex={6} href={url.loginResetCredentialsUrl} className="text-sm underline keep-underline-on-hover" style={{color: 'var(--color-text-primary)'}}>
                                                Wachtwoord vergeten?
                                            </a>
                                        </div>
                                    ) : <div />}
                                </div>
                                <button
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className="w-full py-3 px-4 text-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{backgroundColor: 'var(--color-orange)', borderRadius: '100px', color: 'var(--color-text-primary)'}}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                >
                                    Inloggen
                                </button>
                            </div>

                            {realm.password && realm.registrationAllowed && !registrationDisabled && (
                                <div className="text-sm mt-4" style={{color: 'var(--color-text-primary)'}}>
                                    Heb je nog geen account?{" "}
                                    <a tabIndex={8} href={url.registrationUrl} className="underline keep-underline-on-hover" style={{color: 'var(--color-text-primary)'}}>
                                        Registreer hier.
                                    </a>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);

        assert(passwordInputElement instanceof HTMLInputElement);

        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);

    return (
        <div className="relative">
            {children}
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{color: 'var(--color-green-dark)'}}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
