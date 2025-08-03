import { getElementNowOrWhenMounted } from "../../tools/getElementNowOrWhenMounted";
import { assert } from "tsafe/assert";

export function createGetInputValue(params: { inputName: string }): {
    getInputValue: () => string | undefined;
} {
    const { inputName } = params;

    const { prElement } = getElementNowOrWhenMounted({ selector: 'input[name="password"]' });

    let getValue_actual: (() => string) | undefined = undefined;

    prElement.then(passwordInputElement => {
        assert(passwordInputElement instanceof HTMLInputElement);

        const formElement = passwordInputElement.closest("form");

        if (formElement === null) {
            return;
        }

        assert(formElement instanceof HTMLFormElement);

        const targetInputElement = formElement.querySelector(`input[name="${inputName}"]`);

        if (targetInputElement === null) {
            return;
        }

        assert(targetInputElement instanceof HTMLInputElement);

        getValue_actual = () => targetInputElement.value;
    });

    return {
        getInputValue: () => getValue_actual?.()
    };
}
