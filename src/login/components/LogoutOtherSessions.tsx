import { useI18n } from "../i18n";
import { useKcClsx } from "../_internals/useKcClsx";

export function LogoutOtherSessions() {
    const { msg } = useI18n();

    const { kcClsx } = useKcClsx();

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            id="logout-sessions"
                            name="logout-sessions"
                            value="on"
                            defaultChecked={true}
                        />
                        {msg("logoutOtherSessions")}
                    </label>
                </div>
            </div>
        </div>
    );
}
