import React, {useRef, useState} from "react";
import {getKcClsx} from "keycloakify/login/lib/kcClsx";
import {kcSanitize} from "keycloakify/lib/kcSanitize";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../KcContext";
import type {I18n} from "../i18n";
import {clsx} from "keycloakify/tools/clsx";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {kcClsx} = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const {otpLogin, url, messagesPerField} = kcContext;

    const {msg, msgStr} = i18n;

    // ToDo: Create a component to clean up the OTP functionality below
    const otpLength = 6;

    const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

    const [otpValues, setOtpValues] = useState<string[]>(Array(otpLength).fill(""));

    const handleInput = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;

        if (isNaN(Number(value))) {
            target.value = "";
            return;
        }

        if (value !== "") {
            const next = target.nextElementSibling as HTMLInputElement | null;
            if (next) {
                next.focus();
            }
        }

        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData("text").trim();

        // Should be integers only
        if (!/^\d+$/.test(pasteData)) return;

        const values = pasteData.split("").slice(0, otpLength);
        const newOtpValues = [...otpValues];

        values.forEach((value, i) => {
            if (i < otpLength) {
                newOtpValues[i] = value;
                if (inputRef.current[i]) {
                    inputRef.current[i].value = value;
                }
            }
        });

        setOtpValues(newOtpValues);

        // Move focus to the last filled input
        const lastIndex = Math.min(values.length, otpLength) - 1;
        if (lastIndex >= 0 && inputRef.current[lastIndex]) {
            inputRef.current[lastIndex].focus();
        }

        e.preventDefault();
    };

    const handleKeyUp = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const key = e.key.toLowerCase();

        if (key === "backspace" || key === "delete") {
            target.value = "";
            const prev = target.previousElementSibling as HTMLInputElement | null;
            if (prev) {
                prev.focus();
            }

            const newOtpValues = [...otpValues];
            newOtpValues[index] = "";
            setOtpValues(newOtpValues);
        }
    }

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-login-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post"
            >
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div className={kcClsx("kcFormGroupClass")}>
                    </div>
                )}

                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={clsx(kcClsx("kcLabelWrapperClass"), "text-center font-bold text-lg p-4")}>
                        <label htmlFor="otp" className={kcClsx("kcLabelClass")}>
                            Please Input your {msg("loginOtpOneTime")}
                        </label>
                    </div>
                    <div className={kcClsx("kcInputWrapperClass")} id={"inputs"}>
                        <div className={"flex justify-center items-center"}>
                            {Array.from({length: otpLength}).map((_, index) => (
                                <input
                                    key={index}
                                    className={"otp-input"}
                                    type="text"
                                    autoFocus={index === 0}
                                    autoComplete="off"
                                    name={`otp-${index}`}
                                    id={`otp-${index}`}
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={otpValues[index]}
                                    onChange={handleInput(index)}
                                    ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
                                    onKeyDown={handleKeyUp(index)}
                                    onPaste={handlePaste}
                                />
                            ))}
                        </div>
                        {/*Hidden input element aggregates the input values for validation before submission*/}
                        <input id={"otp"} name={"otp"} autoComplete="off" type={"hidden"} value={otpValues.join("")}
                               className={clsx(
                                   kcClsx("kcInputClass"),
                                   "block focus:outline-none border-secondary-200 mt-1 rounded-md w-full focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 sm:text-sm")}
                               autoFocus={true} aria-invalid={messagesPerField.existsError("totp")}
                        />
                        {messagesPerField.existsError("totp") && (
                            <span
                                id="input-error-otp-code"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("totp"))
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                    </div>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input
                            className={clsx(kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), "rounded-md bg-primary-600 text-white focus:ring-primary-600 hover:bg-primary-700 px-4 py-2 text-sm flex justify-center relative w-full focus:outline-none focus:ring-2 focus:ring-offset-2")}
                            name="login"
                            id="kc-login"
                            type="submit"
                            value={msgStr("doLogIn")}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}
