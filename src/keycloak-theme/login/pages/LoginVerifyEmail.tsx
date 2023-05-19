import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, user } = kcContext;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={
            <div>                    
                <div className="flex justify-center pb-8">
                    <svg width="53" height="48" viewBox="0 0 53 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M52.3146 24.7922L52.3393 24.8463L52.3786 24.8909C52.5168 25.0474 52.6 25.2521 52.6 25.4765C52.6 25.4936 52.5996 25.5071 52.5989 25.5191L52.5974 25.5438L52.5989 25.5685C52.5996 25.5795 52.6 25.5932 52.6 25.6101V37.5222C52.6 42.6964 48.3899 46.907 43.2152 46.907H9.78478C4.61059 46.907 0.4 42.6969 0.4 37.5222V25.6101C0.4 25.5932 0.400365 25.5795 0.401057 25.5685L0.402617 25.5435L0.401057 25.5186C0.400368 25.5075 0.4 25.4939 0.4 25.4765C0.4 25.2243 0.504897 24.9971 0.674514 24.8354L0.720565 24.7915L0.750723 24.7354L7.01674 13.0954L7.01676 13.0953C8.16088 10.9694 10.3712 9.64939 12.7855 9.64939H15.0903C15.5792 9.64939 15.9759 10.0461 15.9759 10.535C15.9759 11.0239 15.5792 11.4206 15.0903 11.4206H12.7855C11.0246 11.4206 9.41139 12.3842 8.5763 13.9352L8.57628 13.9353L3.15733 24.0019L2.83995 24.5915H3.50954H14.5523C14.8975 24.5915 15.2112 24.7922 15.3562 25.1061C15.3562 25.1061 15.3562 25.1061 15.3562 25.1061L17.5723 29.908C18.3511 31.5954 20.054 32.6852 21.9129 32.6852H30.8492C32.7077 32.6852 34.4109 31.5955 35.1897 29.908L37.4059 25.1061L37.406 25.1058C37.5504 24.7924 37.8643 24.5915 38.2098 24.5915H49.6543H50.2764L50.0182 24.0255L45.5441 14.2173L45.1802 14.3833L45.5441 14.2173C44.7688 12.5179 43.0625 11.4205 41.1946 11.4205H37.9096C37.4206 11.4205 37.024 11.0238 37.024 10.5349C37.024 10.0459 37.4207 9.64927 37.9096 9.64927H41.1946C43.7531 9.64927 46.0937 11.1542 47.1554 13.4822L47.1554 13.4822L52.3146 24.7922Z" fill="url(#paint0_linear_486_233394)" stroke="url(#paint1_linear_486_233394)" stroke-width="0.8"/>
                        <path d="M26.1885 0.000352411C25.4787 0.000352411 24.9029 0.576086 24.9029 1.28595V17.588L20.1377 13.7378C19.5854 13.2916 18.776 13.3774 18.3297 13.9297C17.8834 14.4821 17.9693 15.2915 18.5216 15.7378L25.5723 21.4341C25.8078 21.6246 26.0943 21.7197 26.3803 21.7197C26.6664 21.7197 26.9524 21.6246 27.1884 21.4341L34.2391 15.7378C34.7914 15.2915 34.8772 14.482 34.431 13.9297C33.9852 13.3774 33.1752 13.2916 32.6229 13.7378L27.4739 17.898V1.2856C27.4739 0.575791 26.8986 0 26.1883 0L26.1885 0.000352411Z" fill="#2DC0FF"/>
                        <defs>
                            <linearGradient id="paint0_linear_486_233394" x1="26.5" y1="9.24927" x2="26.5" y2="47.307" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white" stop-opacity="0.1"/>
                                <stop offset="1" stop-color="white" stop-opacity="0.2"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_486_233394" x1="27" y1="13" x2="27" y2="52" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white" stop-opacity="0"/>
                                <stop offset="1" stop-color="white" stop-opacity="0.16"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h1>Verification Sent</h1>
                <p className="text-center">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
            </div>
        }>
            <p className="instruction">
                {msg("emailVerifyInstruction2")}
                <br />
                <a href={url.loginAction}>{msg("doClickHere")}</a>
                &nbsp;
                {msg("emailVerifyInstruction3")}
            </p>
            <div className={getClassName("kcFormGroupClass")}>

                    <div id="kc-form-options" className={getClassName("kcFormOptionsClass")} >
                        <div className={getClassName("kcFormOptionsWrapperClass")}>
                            <span className="text-sm">
                                <a href={url.loginUrl}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.94531 6.57031C2.94531 6.1561 2.60953 5.82031 2.19531 5.82031C1.7811 5.82031 1.44531 6.1561 1.44531 6.57031V11.5703C1.44531 11.6579 1.46033 11.742 1.48792 11.8201C1.52402 11.9226 1.58304 12.0188 1.66498 12.1007C1.81442 12.2502 2.01124 12.3234 2.20708 12.3203H7.19531C7.60953 12.3203 7.94531 11.9845 7.94531 11.5703C7.94531 11.1561 7.60953 10.8203 7.19531 10.8203H4.00606L5.22578 9.6006C6.1698 8.65609 7.37275 8.01281 8.68245 7.75215C9.99215 7.4915 11.3497 7.62517 12.5834 8.13627C13.8172 8.64737 14.8715 9.51292 15.6132 10.6234C16.3549 11.7339 16.7505 13.0394 16.75 14.3748C16.7498 14.789 17.0855 15.1249 17.4997 15.1251C17.9139 15.1252 18.2498 14.7896 18.25 14.3754C18.2506 12.7432 17.7671 11.1476 16.8606 9.79032C15.9541 8.43305 14.6654 7.37516 13.1575 6.75048C11.6497 6.12581 9.99041 5.96243 8.38967 6.28101C6.78898 6.59957 5.31862 7.38589 4.16484 8.54021L2.94531 9.75974V6.57031Z" />
                                    </svg>
                                     back to <span className="text-white">Log in</span>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
        </Template>
    );
}
