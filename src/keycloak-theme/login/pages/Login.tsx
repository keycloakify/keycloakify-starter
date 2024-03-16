// import { clsx } from "keycloakify/tools/clsx";
// import { useConstCallback } from "keycloakify/tools/useConstCallback";
// import type { PageProps } from "keycloakify/login/pages/PageProps";
// import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
export default function Login(props: any) {

    return <form action={props.submitUrl} method="post"><input name="username" defaultValue={props.username} />
    </form>
}
