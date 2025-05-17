import type { Attribute } from "../../_internals/KcContext";
import { useI18n } from "../../i18n";

export function InputLabel(props: { attribute: Attribute; option: string }) {
    const { attribute, option } = props;
    const { advancedMsg } = useI18n();

    if (attribute.annotations.inputOptionLabels !== undefined) {
        const { inputOptionLabels } = attribute.annotations;

        return advancedMsg(inputOptionLabels[option] ?? option);
    }

    if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
        return advancedMsg(
            `${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`
        );
    }

    return option;
}
