export default Page

import React from 'react';
import { usePageContext } from '../../src/usePageContext';
import Login from '../../src/keycloak-theme/login/pages/Login'

function Page() {
    const { username, submitUrl } = (usePageContext().data)
    return (
    <>
      <Login username={username} submitUrl={submitUrl} />
    </>
  )
}