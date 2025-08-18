import { useI18n } from "../../i18n";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { assert } from "tsafe/assert";

export function LanguageSelect() {
    const { msgStr, currentLanguage, enabledLanguages } = useI18n();
    const { kcClsx } = useKcClsx();

    if (enabledLanguages.length === 1) {
        return null;
    }

    return (
        <div className={kcClsx("kcLoginMainHeaderUtilities")}>
            <div className={kcClsx("kcInputClass")}>
                <select
                    aria-label={msgStr("languages")}
                    id="login-select-toggle"
                    onChange={e => {
                        const languageTag = e.currentTarget.value;

                        const enabledLanguage = enabledLanguages.find(
                            enabledLanguage => enabledLanguage.languageTag === languageTag
                        );

                        assert(enabledLanguage !== undefined);

                        window.location.href = enabledLanguage.href;
                    }}
                    defaultValue={currentLanguage.languageTag}
                >
                    {enabledLanguages.map(({ languageTag, label }) => (
                        <option key={languageTag} value={languageTag}>
                            {label}
                        </option>
                    ))}
                </select>
                <span className={kcClsx("kcFormControlUtilClass")}>
                    <span className={kcClsx("kcFormControlToggleIcon")}>
                        <svg
                            className="pf-v5-svg"
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
        </div>
    );
}
