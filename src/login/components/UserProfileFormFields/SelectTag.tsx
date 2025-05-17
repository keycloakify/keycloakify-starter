
import { assert } from "keycloakify/tools/assert";
import type { InputFieldByTypeProps } from "./InputFieldByType";
import { InputLabel } from "./InputLabelX";
import { useKcClsx } from "../../_internals/useKcClsx";

export function SelectTag(props: InputFieldByTypeProps) {
    
    const { attribute, dispatchFormAction, displayableErrors, valueOrValues } = props;

    const { kcClsx } = useKcClsx();

    const isMultiple = attribute.annotations.inputType === "multiselect";

    return (
        <select
            id={attribute.name}
            name={attribute.name}
            className={kcClsx("kcInputClass")}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            multiple={isMultiple}
            size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
            value={valueOrValues}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: (() => {
                        if (isMultiple) {
                            return Array.from(event.target.selectedOptions).map(option => option.value);
                        }

                        return event.target.value;
                    })()
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        >
            {!isMultiple && <option value=""></option>}
            {(() => {
                const options = (() => {
                    walk: {
                        const { inputOptionsFromValidation } = attribute.annotations;

                        if (inputOptionsFromValidation === undefined) {
                            break walk;
                        }

                        assert(typeof inputOptionsFromValidation === "string");

                        const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];

                        if (validator === undefined) {
                            break walk;
                        }

                        if (validator.options === undefined) {
                            break walk;
                        }

                        return validator.options;
                    }

                    return attribute.validators.options?.options ?? [];
                })();

                return options.map((option, i) => (
                    <option key={option} value={option}>
                        {<InputLabel
                            key={i}
                            attribute={attribute}
                            option={option}
                        />}
                    </option>
                ));
            })()}
        </select>
    );
}
