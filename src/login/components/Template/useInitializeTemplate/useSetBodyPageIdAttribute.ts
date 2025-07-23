
import { useLayoutEffect } from "react";
import { useKcContext } from "../../../KcContext";

export function useSetBodyPageIdAttribute(){

    const { kcContext } = useKcContext();

    useLayoutEffect(
        ()=> {

            const name= "data-page-id";

            document.body.setAttribute(
              name,
              `login-${kcContext.pageId.replace(/\.ftl$/, "")}`
            );

            return ()=> {
                document.body.removeAttribute(name);
            };

        },
        []
    );

}