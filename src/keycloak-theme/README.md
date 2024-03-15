Your theme source files should be located in a keycloak-theme directory somewhere in your src directory OR at the root of your directory.  
Acceptable directory strucuture:

```txt
src/
  keycloak-theme/
    login/
    account/
    email/

===OR===

src/
  foo/
    bar/
      keycloak-theme/
        login/
        account/
        email/

===OR===

src/
  login/
  account/
  email/
```

You don't need to have all three variant of the theme. If you only need the login theme for example you can have only the login directory.
