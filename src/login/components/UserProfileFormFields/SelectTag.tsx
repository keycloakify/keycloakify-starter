import { assert } from "tsafe/assert";
import type { InputFieldByTypeProps } from "./InputFieldByType";
import { InputLabel } from "./InputLabel";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

export function SelectTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, displayableErrors, valueOrValues } = props;

    const { kcClsx } = useKcClsx();

    const isMultiple = attribute.annotations.inputType === "multiselect";

    return (
        <div className={kcClsx("kcInputClass")}>
            <select
                id={attribute.name}
                name={attribute.name}
                className={kcClsx("kcInputClass")}
                aria-invalid={displayableErrors.length !== 0}
                disabled={attribute.readOnly}
                multiple={isMultiple}
                size={
                    attribute.annotations.inputTypeSize === undefined
                        ? undefined
                        : parseInt(`${attribute.annotations.inputTypeSize}`)
                }
                value={valueOrValues}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (isMultiple) {
                                return Array.from(event.target.selectedOptions).map(
                                    option => option.value
                                );
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

                            const validator = (
                                attribute.validators as Record<string, { options?: string[] }>
                            )[inputOptionsFromValidation];

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
                            {<InputLabel key={i} attribute={attribute} option={option} />}
                        </option>
                    ));
                })()}
            </select>
            <span className={kcClsx("kcFormControlUtilClass")}>
                <span className={kcClsx("kcFormControlToggleIcon")}>
                    <svg
                        className={"pf-v5-svg"}
                        viewBox="0 0 320 512"
                        fill="currentColor"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                    >
                        <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                    </svg>
                </span>
            </span>
        </div>
    );
}
