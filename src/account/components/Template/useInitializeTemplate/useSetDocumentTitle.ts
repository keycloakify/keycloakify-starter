import { useLayoutEffect } from "react";
import { useI18n } from "../../../i18n";

export function useSetDocumentTitle() {
    const { msgStr } = useI18n();

    useLayoutEffect(() => {
        const title_before = document.title;

        document.title = msgStr("accountManagementTitle");

        return () => {
            document.title = title_before;
        };
    }, []);
}
