// ejected using 'npx eject-keycloak-page'
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { FormEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { SectionDivider } from "../components/divider";
import { HeaderNode } from "../components/header-node";
import { SocialProvider } from "../components/social-provider";
import { SubmitInput } from "../components/submit-input";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
  } = kcContext;

  const [paramEmail, paramTempPassword] = useMemo(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramEmail = urlParams.get("email");
    const paramTempPassword = urlParams.get("password");
    return [paramEmail, paramTempPassword];
  }, [window.location.search]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [rememberMe, setRememberMe] = useState(login.rememberMe === "on");
  const [email, setEmail] = useState(paramEmail ?? login.username ?? "");
  const [errors, setErrors] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const id = setInterval(() => {
      if (
        ref.current !== null &&
        paramEmail !== null &&
        paramTempPassword !== null
      ) {
        handleSubmit(ref.current);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [ref.current, paramEmail, paramTempPassword]);

  const validateEmail = () => {
    if (!email) {
      setErrors("Required");
    } else if (!/^[\w.%+-]+@[^_\W.-]+\.[A-Za-z]{2,24}$/g.test(email)) {
      setErrors("Invalid email address");
    } else {
      setErrors("");
    }
  };
  const handleSubmit = (e: HTMLFormElement) => {
    setWasSubmitted(true);
    if (e.checkValidity() === true) {
      setIsButtonDisabled(true);
      //NOTE: Even if we login with email Keycloak expect username and password in
      //the POST request.
      e.querySelector("input[name='email']")?.setAttribute("name", "username");
      e.submit();
    } else {
      validateEmail();
    }
  };

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement | null>>(
    (e) => {
      e.preventDefault();
      setWasSubmitted(true);
      const formElement = e.target as HTMLFormElement;
      handleSubmit(formElement);
    }
  );

  useEffect(() => {
    if (wasSubmitted) {
      validateEmail();
    }
  }, [email]);
  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayInfo={
        realm.password && realm.registrationAllowed && !registrationDisabled
      }
      displayWide={realm.password && social.providers !== undefined}
      headerNode={
        <HeaderNode
          title="Meet BuildBetter"
          subtitle="Make better product decisions, 5x faster."
        />
      }
      infoNode={
        realm.password &&
        realm.registrationAllowed &&
        !registrationDisabled && (
          <Link href={url.registrationUrl} cursor="pointer">
            <Button
              className={"h-11 w-full m-0 text-bold"}
              size="md"
              colorScheme="gray"
            >
              <svg
                className={"h-5 mb-0.5 mr-2 "}
                viewBox="0 0 24 24"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  d="M12 3C9.61303 3 7.32394 3.94821 5.63606 5.63606C3.94817 7.32391 3 9.61303 3 12C3 14.387 3.94821 16.6761 5.63606 18.3639C7.32391 20.0518 9.61303 21 12 21C14.387 21 16.6761 20.0518 18.3639 18.3639C20.0518 16.6761 21 14.387 21 12C21 10.4202 20.5841 8.86817 19.7942 7.5C19.0043 6.13185 17.8681 4.9956 16.5001 4.20583C15.1319 3.41592 13.58 3.00007 12.0001 3.00007L12 3ZM7.1208 17.969C7.88225 16.9574 8.93931 16.2075 10.1457 15.823C11.352 15.4385 12.648 15.4385 13.8543 15.823C15.0607 16.2075 16.1179 16.9574 16.8792 17.969C15.5031 19.0966 13.7789 19.7127 12 19.7127C10.2211 19.7127 8.49669 19.0965 7.1208 17.969ZM17.8083 17.069C16.8827 15.8943 15.6226 15.0281 14.1945 14.5845C12.7663 14.141 11.2371 14.141 9.80897 14.5845C8.38082 15.028 7.1208 15.8943 6.19509 17.069C4.88727 15.5737 4.20669 13.6315 4.29497 11.647C4.38336 9.6624 5.23394 7.78851 6.6696 6.41537C8.10525 5.04233 10.0152 4.27594 12.0017 4.27594C13.9882 4.27594 15.8981 5.04228 17.3338 6.41537C18.7694 7.78848 19.62 9.6624 19.7085 11.647C19.7968 13.6317 19.1162 15.5738 17.8083 17.069Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M12 5.89282C10.9771 5.89282 9.996 6.29923 9.27257 7.02257C8.54923 7.74591 8.14282 8.72702 8.14282 9.75C8.14282 10.773 8.54923 11.754 9.27257 12.4774C9.99591 13.2008 10.977 13.6072 12 13.6072C13.023 13.6072 14.004 13.2008 14.7274 12.4774C15.4508 11.7541 15.8572 10.773 15.8572 9.75C15.8572 8.72702 15.4508 7.746 14.7274 7.02257C14.0041 6.29923 13.023 5.89282 12 5.89282ZM12 12.3214C11.318 12.3214 10.6639 12.0505 10.1817 11.5682C9.69939 11.086 9.4285 10.4319 9.4285 9.7499C9.4285 9.06787 9.69945 8.41382 10.1817 7.93155C10.6639 7.44929 11.318 7.1784 12 7.1784C12.682 7.1784 13.3361 7.44934 13.8183 7.93155C14.3006 8.41376 14.5715 9.06787 14.5715 9.7499C14.5715 10.4319 14.3006 11.086 13.8183 11.5682C13.3361 12.0505 12.682 12.3214 12 12.3214Z"
                  fill="currentColor"
                ></path>
              </svg>
              Create an Account
            </Button>
          </Link>
        )
      }
    >
      <Flex direction="column" className="space-y-4">
        {realm.password && (
          <form
            id="kc-form-login"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSubmit(e);
            }}
            action={url.loginAction}
            method="post"
            noValidate
            ref={ref}
            className="space-y-4"
          >
            <FormControl>
              {!usernameHidden &&
                (() => {
                  const label = !realm.loginWithEmailAllowed
                    ? "username"
                    : realm.registrationEmailAsUsername
                    ? "email"
                    : "usernameOrEmail";

                  const autoCompleteHelper: typeof label =
                    label === "usernameOrEmail" ? "username" : label;

                  return (
                    <>
                      <Input
                        tabIndex={1}
                        id={autoCompleteHelper}
                        className="form-control"
                        //NOTE: This is used by Google Chrome auto fill so we use it to tell
                        //the browser how to pre fill the form but before submit we put it back
                        //to username because it is what keycloak expects.
                        name={autoCompleteHelper}
                        defaultValue={email}
                        onChange={(e) =>
                          setEmail((e.target as HTMLInputElement).value)
                        }
                        type="text"
                        placeholder="Email Address"
                        {...(usernameHidden
                          ? { disabled: true }
                          : {
                              autoFocus: true,
                              autoComplete: "off",
                            })}
                        required
                        pattern="^[\w.%+-]+@[^_\W.-]+\.[A-Za-z]{2,24}$"
                      />
                      {!!errors ? (
                        <FormErrorMessage>{errors}</FormErrorMessage>
                      ) : null}
                    </>
                  );
                })()}
            </FormControl>
            <FormControl>
              <Input
                tabIndex={2}
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                placeholder="Password"
                value={paramTempPassword ?? undefined}
              />
            </FormControl>
            <VStack alignItems="start" spacing={1}>
              {realm.rememberMe && !usernameHidden && (
                <Checkbox
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                  }}
                  checked={rememberMe}
                  colorScheme="gray"
                >
                  <Text fontSize="small">Remember Me</Text>
                </Checkbox>
              )}
              {realm.resetPasswordAllowed && (
                <Flex className="space-x-1" fontSize="small">
                  <svg
                    viewBox="0 0 20 19"
                    focusable="false"
                    className="h-4 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.29749 8.56792C8.29749 7.50738 9.09098 6.73624 9.94018 6.73624C10.8284 6.73624 11.5829 7.54841 11.5829 8.36145V9.58237H8.29749V8.56792ZM6.79749 9.70692V8.56792C6.79749 6.78837 8.15722 5.23624 9.94018 5.23624C11.6839 5.23624 13.0829 6.74734 13.0829 8.36145V9.70677C14.5313 10.1094 15.6007 11.4422 15.6007 13.0156V15.4841C15.6007 17.3738 14.0576 18.9173 12.1675 18.9173H7.71348C5.82335 18.9173 4.28027 17.374 4.28027 15.4841V13.0156C4.28027 11.4424 5.34922 10.1097 6.79749 9.70692ZM5.78027 13.0156C5.78027 11.9539 6.65181 11.0824 7.71348 11.0824H12.1675C13.229 11.0824 14.1007 11.9539 14.1007 13.0156V15.4841C14.1007 16.5455 13.2291 17.4173 12.1675 17.4173H7.71348C6.65184 17.4173 5.78027 16.5456 5.78027 15.4841V13.0156Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M18.8084 7.91959C17.8455 3.94868 14.2671 1 10.0004 1C5.73318 1 2.15495 3.94892 1.19238 7.91967V2.04475"
                      fill="None"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                    Forgot Password?
                  </a>
                </Flex>
              )}

              <Flex className="space-x-1" fontSize="small">
                <svg viewBox="0 0 20 20" focusable="false" className="h-4 mr-1">
                  <path
                    d="M10 20C12.6521 20 15.1957 18.9465 17.071 17.071C18.9464 15.1957 20 12.6522 20 10C20 7.3478 18.9465 4.80434 17.071 2.92896C15.1957 1.05356 12.6522 0 10 0C7.3478 0 4.80434 1.05352 2.92896 2.92896C1.05356 4.80426 0 7.3478 0 10C0.00335706 12.651 1.05804 15.1927 2.93259 17.0673C4.80729 18.9418 7.34881 19.9966 9.99989 19.9999L10 20ZM10 1.95249C12.1336 1.95249 14.1801 2.80009 15.6889 4.30872C17.1978 5.81735 18.0455 7.86356 18.0457 9.99724C18.0458 12.1309 17.1985 14.1773 15.6899 15.6861C14.1814 17.1951 12.1352 18.0429 10.0018 18.0434C7.868 18.0437 5.82131 17.1965 4.31249 15.688C2.80342 14.1797 1.95541 12.1335 1.95481 9.99989C1.957 7.8667 2.80547 5.82169 4.3138 4.31324C5.82213 2.8048 7.86718 1.95645 10.0004 1.95425L10 1.95249ZM10.9102 14.9007C10.9102 15.1748 10.8013 15.4379 10.6075 15.6317C10.4136 15.8255 10.1506 15.9344 9.87652 15.9344C9.60241 15.9344 9.33954 15.8255 9.14558 15.6317C8.95175 15.4378 8.84286 15.1748 8.84286 14.9007C8.84286 14.6266 8.95175 14.3636 9.14558 14.1698C9.33956 13.976 9.60245 13.8671 9.87652 13.8671C10.1511 13.8671 10.4142 13.9763 10.6082 14.1705C10.8022 14.3648 10.9108 14.6284 10.9102 14.9028L10.9102 14.9007ZM6.65202 6.84475C6.56167 6.58786 6.57743 6.30542 6.69595 6.06008C6.97882 5.4663 7.42327 4.96422 7.97849 4.61157C8.5337 4.25879 9.17694 4.06977 9.83465 4.06596H9.85567C10.7734 4.06961 11.6543 4.42794 12.3141 5.06593C12.9739 5.70376 13.3616 6.5721 13.396 7.48927C13.4195 8.24184 13.2 8.98198 12.77 9.59997C12.34 10.2181 11.7223 10.6812 11.0086 10.9209C11.0086 10.9209 10.9061 10.9565 10.9061 11.0171V11.8374H10.906C10.906 12.2048 10.7101 12.5443 10.3917 12.728C10.0736 12.9118 9.6815 12.9118 9.36334 12.728C9.04515 12.5443 8.84911 12.2048 8.84911 11.8374V11.0171C8.85379 10.5626 9.00077 10.1208 9.26948 9.75411C9.53833 9.38731 9.91519 9.11407 10.3474 8.97279C10.6449 8.87194 10.902 8.67825 11.081 8.4202C11.2599 8.16214 11.3512 7.85329 11.3412 7.53949C11.3211 7.15941 11.1573 6.80123 10.8831 6.5375C10.6088 6.27375 10.2445 6.12402 9.86399 6.11875C9.58944 6.12167 9.32133 6.20165 9.09011 6.34966C8.85892 6.49766 8.67383 6.70769 8.5562 6.95569C8.43914 7.20484 8.22706 7.39648 7.96739 7.48784C7.70774 7.57921 7.42238 7.56257 7.17514 7.44172C6.92788 7.32087 6.73945 7.10587 6.65202 6.84473V6.84475Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <a
                  href="mailto:support@buildbetter.ai"
                  target="_blank"
                  rel="noreferrer"
                >
                  Having trouble? Contact us
                </a>
              </Flex>
            </VStack>
            <div
              id="kc-form-buttons"
              className={clsx(
                getClassName("kcFormButtonsClass"),
                "flex justify-start !ml-auto float-none w-auto !mt-0 !p-0"
              )}
            >
              <input
                type="hidden"
                id="id-hidden-input"
                name="credentialId"
                {...(auth?.selectedCredential !== undefined
                  ? {
                      value: auth.selectedCredential,
                    }
                  : {})}
              />
            </div>
            <SubmitInput
              cursor="pointer"
              isDisabled={isButtonDisabled}
              bgColor="purple.700"
              border="none"
              _hover={{
                bgColor: "purple.600",
              }}
              tabIndex={4}
              name="login"
              id="kc-login"
              type="submit"
              value="Log In"
            />
          </form>
        )}
        {realm.password &&
          social.providers !== undefined &&
          social.providers.map((p) => {
            return (
              <SocialProvider
                {...p}
                prefix="Sign in with "
                key={p.providerId}
              />
            );
          })}
      </Flex>
      <SectionDivider text="or" />
    </Template>
  );
}
