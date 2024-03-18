import { Flex, FormControl, FormErrorMessage, Input, Text } from "@chakra-ui/react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { BackTo } from "../components/back-to-login";
import { HeaderNode } from "../components/header-node";
import { SubmitInput } from "../components/submit-input";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormEvent, SyntheticEvent } from "react";

export default function LoginUpdateProfile(
  props: PageProps<Extract<KcContext, { pageId: "login-update-profile.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, client, user } = kcContext;

  function setFirstName(value: string): void {
    throw new Error("Function not implemented.");
  }
  const firstName = ""
  const errors = {
    firstName: "",
  }

  const formValidation = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      // Normally Formik's onSubmit isn't used for traditional POST submissions
      // But you can perform actions here if needed before a manual submission
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValidation.isValid) {
      e.currentTarget.submit()
    }
  }


  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={<HeaderNode title="Update User Profile" />}
    >
      <Flex direction="column">
        <form
          id='kc-update-login-form'
          className="space-y-2"
          // action={url.loginAction}
          onSubmit={handleSubmit}
          method="POST"
        >
          <FormControl isInvalid={!!formValidation.errors.firstName}>
            <Input
              id="firstName"
              name="firstName"
              type='text'
              onChange={formValidation.handleChange}
              onBlur={formValidation.handleBlur}
              value={formValidation.values.firstName}
              placeholder="First name"
              autoComplete="given-name"
              required
            />
            {
              formValidation.touched.firstName &&
              <FormErrorMessage>
                {formValidation.errors.firstName}
              </FormErrorMessage>
            }
          </FormControl>
          <FormControl isInvalid={!!formValidation.errors.lastName}>
            <Input
              id="lastName"
              name="lastName"
              type='text'
              onChange={formValidation.handleChange}
              onBlur={formValidation.handleBlur}
              value={formValidation.values.lastName}
              placeholder="Last name"
              autoComplete="family-name"
              required
            />
            {
              formValidation.touched.lastName &&
              <FormErrorMessage>
                {formValidation.errors.lastName}
              </FormErrorMessage>
            }
          </FormControl>
          <FormControl isInvalid={!!formValidation.errors.email}>
            <Input
              id="email"
              name="email"
              type='text'
              onChange={formValidation.handleChange}
              onBlur={formValidation.handleBlur}
              value={formValidation.values.email}
              placeholder="email"
              autoComplete="email"
              required
            />
            {
              formValidation.touched.email &&
              <FormErrorMessage>
                {formValidation.errors.email}
              </FormErrorMessage>
            }
          </FormControl>
          <SubmitInput
            name="confirmLogout"
            id="kc-logout"
            type="submit"
            isDisabled={!formValidation.isValid}
            value={"Confirm and Login"}
          />
        </form>
      </Flex>
    </Template>
  );
}
