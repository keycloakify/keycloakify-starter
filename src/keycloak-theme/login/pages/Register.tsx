// ejected using 'npx eject-keycloak-page'
import { useState, useEffect, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { FormInputError } from "./shared/FormInputError";

export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, register, realm, passwordRequired, recaptchaRequired, recaptchaSiteKey } = kcContext;

    

    const [email, setEmail] = useState(register.formData.email ?? "");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState({} as {email: string, password: string, passwordConfirm: string});
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const validateEmail = () => {
        if (!email) {
            return "Required";
        } else if (!/^[\w.%+-]+@[^_\W.-]+\.[A-Za-z]{2,24}$/g.test(email)) {
            return "Invalid email address";
        }        
        return "";
        
    };

    const validatePassword = () => {
        if (!password) {
            return "Required";
        } else if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        return "";
    };
    const validatePasswordConfirm = () => {
        if (!passwordConfirm) {
            return "Required";
        } else if (password!== passwordConfirm) {
            return "Passwords do not match";
        }
        return "";      
    };
    const validateForm = () => {
        setErrors({email: validateEmail(), password: validatePassword(), passwordConfirm: validatePasswordConfirm()});
    }

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();
        setWasSubmitted(true);
        const formElement = e.target as HTMLFormElement;
        if (formElement.checkValidity() === true) {
            formElement.submit();
        }
        else {
            validateForm();
        }

    });
    useEffect(() => {
        if (wasSubmitted) {
            validateForm();
        }
    }, [email, password, passwordConfirm]);
    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={
                <div>                    
                    <div className="flex justify-center pb-8">
                        <img src={require("./../assets/logo-dark.png") } className="h-12 w-12"/>
                    </div>
                    <h1 >Join BuildBetter</h1>
                    <p className="text-center">Make better product decisions, 5x faster.</p>
                </div>
            }>
                
            <form id="kc-register-form" className={getClassName("kcFormClass")} action={url.registrationAction} method="post" onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); onSubmit(e) }} noValidate>
                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("firstName", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={getClassName("kcInputWrapperClass")}>
                        <input
                            type="hidden"
                            id="firstName"
                            className={getClassName("kcInputClass")}
                            name="firstName"
                            placeholder="First name"
                            value=" "
                        />
                    </div>
                </div>

                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("lastName", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={getClassName("kcInputWrapperClass")}>
                        <input
                            type="hidden"
                            id="lastName"
                            className={getClassName("kcInputClass")}
                            name="lastName"
                            placeholder="Last name"
                            value=" "
                        />
                    </div>
                </div>

                <div
                    className={clsx(getClassName("kcFormGroupClass"), messagesPerField.printIfExists("email", getClassName("kcFormGroupErrorClass")))}
                >
                    <div className={getClassName("kcInputWrapperClass")}>
                        <input
                            type="text"
                            id="email"
                            className={getClassName("kcInputClass")}
                            name="email"
                            defaultValue={ email }
                            autoComplete="email"
                            placeholder="Email"
                            required                            
                            pattern="^[\w.%+-]+@[^_\W.-]+\.[A-Za-z]{2,24}$"
                            onChange={ (e) => setEmail((e.target as HTMLInputElement).value) }
                        />
                        {!!errors.email ? (                               
                            <FormInputError message={errors.email} />   
                        ) : null}
                    </div>
                </div>
                {!realm.registrationEmailAsUsername && (
                    <div
                        className={clsx(
                            getClassName("kcFormGroupClass"),
                            messagesPerField.printIfExists("username", getClassName("kcFormGroupErrorClass"))
                        )}
                    >
                        <div className={getClassName("kcInputWrapperClass")}>
                            <input
                                type="text"
                                id="username"
                                className={getClassName("kcInputClass")}
                                name="username"
                                defaultValue={register.formData.username ?? ""}
                                autoComplete="username"                                
                                placeholder="Username"
                            />
                        </div>
                    </div>
                )}
                {passwordRequired && (
                    <>
                        <div
                            className={clsx(
                                getClassName("kcFormGroupClass"),
                                messagesPerField.printIfExists("password", getClassName("kcFormGroupErrorClass"))
                            )}
                        >
                            <div className={getClassName("kcInputWrapperClass")}>
                                <input
                                    type="password"
                                    id="password"
                                    className={getClassName("kcInputClass")}
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Password"
                                    onChange={ (e) => setPassword((e.target as HTMLInputElement).value) }
                                    required
                                    minLength={8}
                                />
                                {!!errors.password ? (                              
                                    <FormInputError message={errors.password} />   
                                ) : null}
                            </div>
                        </div>

                        <div
                            className={clsx(
                                getClassName("kcFormGroupClass"),
                                messagesPerField.printIfExists("password-confirm", getClassName("kcFormGroupErrorClass"))
                            )}
                        >
                            <div className={getClassName("kcInputWrapperClass")}>
                                <input type="password" id="password-confirm" className={getClassName("kcInputClass")} name="password-confirm" 
                                    onChange={ (e) => setPasswordConfirm((e.target as HTMLInputElement).value) }
                                    placeholder="Confirm Password" required/>
                                {!!errors.passwordConfirm ? (                               
                                    <FormInputError message={errors.passwordConfirm} /> 
                                ) : null}
                            </div>
                        </div>
                    </>
                )}
                {recaptchaRequired && (
                    <div className="form-group">
                        <div className={getClassName("kcInputWrapperClass")}>
                            <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
                        </div>
                    </div>
                )}
                <div className={getClassName("kcFormGroupClass")}>

                    <div id="kc-form-buttons" className={getClassName("kcFormButtonsClass")}>
                        <input
                            className={clsx(
                                getClassName("kcButtonClass"),
                                getClassName("kcButtonPrimaryClass"),
                                getClassName("kcButtonBlockClass"),
                                getClassName("kcButtonLargeClass")
                            )}
                            type="submit"
                            value="Create Account"
                        />
                    </div>
                    <div id="kc-form-options" className={getClassName("kcFormOptionsClass")} >
                        <div className={getClassName("kcFormOptionsWrapperClass")}>
                            <span>
                                <a href={url.loginUrl}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.94531 6.57031C2.94531 6.1561 2.60953 5.82031 2.19531 5.82031C1.7811 5.82031 1.44531 6.1561 1.44531 6.57031V11.5703C1.44531 11.6579 1.46033 11.742 1.48792 11.8201C1.52402 11.9226 1.58304 12.0188 1.66498 12.1007C1.81442 12.2502 2.01124 12.3234 2.20708 12.3203H7.19531C7.60953 12.3203 7.94531 11.9845 7.94531 11.5703C7.94531 11.1561 7.60953 10.8203 7.19531 10.8203H4.00606L5.22578 9.6006C6.1698 8.65609 7.37275 8.01281 8.68245 7.75215C9.99215 7.4915 11.3497 7.62517 12.5834 8.13627C13.8172 8.64737 14.8715 9.51292 15.6132 10.6234C16.3549 11.7339 16.7505 13.0394 16.75 14.3748C16.7498 14.789 17.0855 15.1249 17.4997 15.1251C17.9139 15.1252 18.2498 14.7896 18.25 14.3754C18.2506 12.7432 17.7671 11.1476 16.8606 9.79032C15.9541 8.43305 14.6654 7.37516 13.1575 6.75048C11.6497 6.12581 9.99041 5.96243 8.38967 6.28101C6.78898 6.59957 5.31862 7.38589 4.16484 8.54021L2.94531 9.75974V6.57031Z" />
                                    </svg>
                                     back to <span className="text-white">Log in</span>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
