import { assert } from "tsafe/assert";
import { useKcClsx } from "@keycloakify/account-multi-page-ui/useKcClsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "sessions.ftl");

    const { kcClsx } = useKcClsx();

    const { msg } = useI18n();

    return (
        <Template active="sessions">
            <div className={kcClsx("kcContentWrapperClass")}>
                <div className="col-md-10">
                    <h2>{msg("sessionsHtmlTitle")}</h2>
                </div>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>{msg("ip")}</th>
                        <th>{msg("started")}</th>
                        <th>{msg("lastAccess")}</th>
                        <th>{msg("expires")}</th>
                        <th>{msg("clients")}</th>
                    </tr>
                </thead>

                <tbody role="rowgroup">
                    {kcContext.sessions.sessions.map((session, index: number) => (
                        <tr key={index}>
                            <td>{session.ipAddress}</td>
                            <td>{session?.started}</td>
                            <td>{session?.lastAccess}</td>
                            <td>{session?.expires}</td>
                            <td>
                                {session.clients.map((client: string, clientIndex: number) => (
                                    <div key={clientIndex}>
                                        {client}
                                        <br />
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form action={kcContext.url.sessionsUrl} method="post">
                <input
                    type="hidden"
                    id="stateChecker"
                    name="stateChecker"
                    value={kcContext.stateChecker}
                />
                <button
                    id="logout-all-sessions"
                    type="submit"
                    className={kcClsx("kcButtonDefaultClass", "kcButtonClass")}
                >
                    {msg("doLogOutAllSessions")}
                </button>
            </form>
        </Template>
    );
}
