import { useLayoutEffect } from "react";
import { useKcContext } from "../../../KcContext.gen";
import { useI18n } from "../../../i18n";

export function useSetDocumentTitle() {
  const { kcContext } = useKcContext();

  const { msgStr } = useI18n();

  useLayoutEffect(() => {
    const title_before = document.title;

    document.title = msgStr("loginTitle", kcContext.realm.displayName || "");

    return () => {
      document.title = title_before;
    };
  }, []);
}
