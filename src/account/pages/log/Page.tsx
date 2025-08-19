import { assert } from "tsafe/assert";
import { useKcClsx } from "../../../@keycloakify/account-multi-page-ui/useKcClsx";
import { useKcContext } from "../../KcContext.gen";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "log.ftl");

    const { kcClsx } = useKcClsx();

    const { msg } = useI18n();

    return (
        <Template active="log">
            <div className={kcClsx("kcContentWrapperClass")}>
                <div className="col-md-10">
                    <h2>{msg("accountLogHtmlTitle")}</h2>
                </div>

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <td>{msg("date")}</td>
                            <td>{msg("event")}</td>
                            <td>{msg("ip")}</td>
                            <td>{msg("client")}</td>
                            <td>{msg("details")}</td>
                        </tr>
                    </thead>

                    <tbody>
                        {kcContext.log.events.map((event, index) => (
                            <tr key={index}>
                                <td>{event.date ? new Date(event.date).toLocaleString() : ""}</td>
                                <td>{event.event}</td>
                                <td>{event.ipAddress}</td>
                                <td>{event.client || ""}</td>
                                <td>
                                    {event.details.map((detail, detailIndex) => (
                                        <span key={detailIndex}>
                                            {`${detail.key} = ${detail.value}`}
                                            {detailIndex < event.details.length - 1 && ", "}
                                        </span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Template>
    );
}
