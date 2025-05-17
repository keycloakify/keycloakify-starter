
import { assert } from "keycloakify/tools/assert";
import type { InputFieldByTypeProps } from "./InputFieldByType";
import { useKcClsx } from "../../_internals/useKcClsx";

export function TextareaTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, displayableErrors, valueOrValues } = props;

    const { kcClsx } = useKcClsx();

    assert(typeof valueOrValues === "string");

    const value = valueOrValues;

    return (
        <textarea
            id={attribute.name}
            name={attribute.name}
            className={kcClsx("kcInputClass")}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            cols={attribute.annotations.inputTypeCols === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeCols}`)}
            rows={attribute.annotations.inputTypeRows === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeRows}`)}
            maxLength={attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
            value={value}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: event.target.value
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        />
    );
}