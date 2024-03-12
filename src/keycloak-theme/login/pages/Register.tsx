// ejected using 'npx eject-keycloak-page'
import { Flex, FormErrorMessage, Input, Spacer } from "@chakra-ui/react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { useEffect, useState, type FormEventHandler } from "react";
import { BackTo } from "../components/back-to-login";
import { SectionDivider } from "../components/divider";
import { HeaderNode } from "../components/header-node";
import { SocialProvider } from "../components/social-provider";
import { SubmitInput } from "../components/submit-input";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, register, realm, passwordRequired, recaptchaRequired, recaptchaSiteKey, social } = kcContext;

    const queryParameters = new URLSearchParams(window.location.search);

    const [email, setEmail] = useState(register.formData.email ?? (queryParameters.get("email") ?? ""));
    const [firstName, setFirstName] = useState(register.formData.firstName ?? "");
    const [lastName, setLastName] = useState(register.formData.lastName ?? "");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState({} as { firstName: string, lastName: string, email: string, password: string, passwordConfirm: string });
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const validateNames = (names: string) => {
        if (!names)
            return "Required";
        return "";
    }

    const validateEmail = () => {
        if (!email) {
            return "Required";
        } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email)) {
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
        } else if (password !== passwordConfirm) {
            return "Passwords do not match";
        }
        return "";
    };
    const validateForm = () => {
        setErrors({
            firstName: validateNames(firstName),
            lastName: validateNames(lastName),
            email: validateEmail(),
            password: validatePassword(),
            passwordConfirm: validatePasswordConfirm()
        });
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
    }, [firstName, lastName, email, password, passwordConfirm]);
    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={
            <HeaderNode title="Join BuildBetter" subtitle="Make better product decisions, 5x faster." />
        }>
            <form id="kc-register-form" className="space-y-2" action={url.registrationAction} method="post" onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); onSubmit(e) }} noValidate>
                <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    defaultValue={firstName}
                    placeholder="First name"
                    autoComplete="given-name"
                    onChange={(e) => setFirstName((e.target as HTMLInputElement).value)}
                    required
                />
                {!!errors.firstName ? (
                    <FormErrorMessage >{errors.firstName}</FormErrorMessage>
                ) : null}

                <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    defaultValue={lastName}
                    autoComplete="family-name"
                    placeholder="Last name"
                    onChange={(e) => setLastName((e.target as HTMLInputElement).value)}
                    required
                />
                {!!errors.lastName ? (
                    <FormErrorMessage >{errors.lastName}</FormErrorMessage>
                ) : null}

                <Input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={email}
                    autoComplete="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                />
                {!!errors.email ? (
                    <FormErrorMessage >{errors.email}</FormErrorMessage>
                ) : null}
                {!realm.registrationEmailAsUsername && (

                    <Input
                        type="text"
                        id="username"
                        name="username"
                        defaultValue={register.formData.username ?? ""}
                        autoComplete="username"
                        placeholder="Username"
                    />
                )}
                {passwordRequired && (
                    <>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            placeholder="Password"
                            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                            required
                            minLength={8}
                        />
                        {!!errors.password ? <FormErrorMessage >{errors.password}</FormErrorMessage> : null}
                        <Input type="password" id="password-confirm" name="password-confirm"
                            onChange={(e) => setPasswordConfirm((e.target as HTMLInputElement).value)}
                            placeholder="Confirm Password" required />
                        {!!errors.passwordConfirm ? <FormErrorMessage >{errors.passwordConfirm}</FormErrorMessage> : null}
                    </>
                )}
                {recaptchaRequired && (
                    <div className="form-group">
                        <div >
                            <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
                        </div>
                    </div>
                )}
                <Spacer />
                <SubmitInput value="Create Account" />
                <Spacer />
            </form>
            <SectionDivider text="or" />
            <Flex direction='column' className='space-y-4 mt-4'>
                {social && social.providers && social.providers.map((p) => <SocialProvider {...p} prefix="Sign up with " key={p.providerId} />)}
                <BackTo loginUrl={url.loginUrl} target="Login" />
            </Flex>
        </Template >
    );
}

