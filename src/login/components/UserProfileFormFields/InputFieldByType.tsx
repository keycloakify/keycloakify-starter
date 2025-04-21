
import { TextareaTag } from "./TextareaTag";
import { SelectTag } from "./SelectTag";
import { InputTagSelects } from "./InputTagSelects";
import { InputTag } from "./InputTag";
import { PasswordWrapper } from "./PasswordWrapper";
import type { KcClsx } from "../../_internals/kcClsx";
import type { FormAction, FormFieldError } from "../../_internals/useUserProfileForm";
import type { Attribute } from "../../_internals/KcContext";
import type { I18n } from "../../i18n";

export type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
};

export function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues } = props;

    switch (attribute.annotations.inputType) {
        case "textarea":
            return <TextareaTag {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }

            const inputNode = <InputTag {...props} fieldIndex={undefined} />;

            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    <PasswordWrapper
                        kcClsx={props.kcClsx}
                        i18n={props.i18n}
                        passwordInputId={attribute.name}
                    >
                        {inputNode}
                    </PasswordWrapper>
                );
            }

            return inputNode;
        }
    }
}