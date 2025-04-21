import type { I18n } from "../i18n";
import type { KcClsx } from "../_internals";

export type PageProps<NarrowedKcContext> = {
    kcContext: NarrowedKcContext;
    i18n: I18n;
    kcClsx: KcClsx;
};
