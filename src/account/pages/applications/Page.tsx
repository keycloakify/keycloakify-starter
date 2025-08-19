import { assert } from "tsafe/assert";
import { useKcClsx } from "@keycloakify/account-multi-page-ui/useKcClsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "applications.ftl");

    const { kcClsx } = useKcClsx();

    const { msg, advancedMsg } = useI18n();

    return (
        <Template active="applications">
            <div className="row">
                <div className="col-md-10">
                    <h2>{msg("applicationsHtmlTitle")}</h2>
                </div>

                <form action={kcContext.url.applicationsUrl} method="post">
                    <input
                        type="hidden"
                        id="stateChecker"
                        name="stateChecker"
                        value={kcContext.stateChecker}
                    />
                    <input type="hidden" id="referrer" name="referrer" value={kcContext.stateChecker} />

                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <td>{msg("application")}</td>
                                <td>{msg("availableRoles")}</td>
                                <td>{msg("grantedPermissions")}</td>
                                <td>{msg("additionalGrants")}</td>
                                <td>{msg("action")}</td>
                            </tr>
                        </thead>

                        <tbody>
                            {kcContext.applications.applications.map(application => (
                                <tr key={application.client.clientId}>
                                    <td>
                                        {application.effectiveUrl && (
                                            <a href={application.effectiveUrl}>
                                                {(application.client.name &&
                                                    advancedMsg(application.client.name)) ||
                                                    application.client.clientId}
                                            </a>
                                        )}
                                        {!application.effectiveUrl &&
                                            ((application.client.name &&
                                                advancedMsg(application.client.name)) ||
                                                application.client.clientId)}
                                    </td>

                                    <td>
                                        {!isArrayWithEmptyObject(application.realmRolesAvailable) &&
                                            application.realmRolesAvailable.map((role, index) => (
                                                <span key={role.name}>
                                                    {role.description
                                                        ? advancedMsg(role.description)
                                                        : advancedMsg(role.name)}
                                                    {index <
                                                        application.realmRolesAvailable.length - 1 &&
                                                        ", "}
                                                </span>
                                            ))}
                                        {application.resourceRolesAvailable &&
                                            Object.keys(application.resourceRolesAvailable).map(
                                                resource => (
                                                    <span key={resource}>
                                                        {!isArrayWithEmptyObject(
                                                            application.realmRolesAvailable
                                                        ) && ", "}
                                                        {application.resourceRolesAvailable[
                                                            resource
                                                        ].map(clientRole => (
                                                            <span key={clientRole.roleName}>
                                                                {clientRole.roleDescription
                                                                    ? advancedMsg(
                                                                          clientRole.roleDescription
                                                                      )
                                                                    : advancedMsg(
                                                                          clientRole.roleName
                                                                      )}{" "}
                                                                {msg("inResource")}{" "}
                                                                <strong>
                                                                    {clientRole.clientName
                                                                        ? advancedMsg(
                                                                              clientRole.clientName
                                                                          )
                                                                        : clientRole.clientId}
                                                                </strong>
                                                                {clientRole !==
                                                                    application.resourceRolesAvailable[
                                                                        resource
                                                                    ][
                                                                        application
                                                                            .resourceRolesAvailable[
                                                                            resource
                                                                        ].length - 1
                                                                    ] && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                )
                                            )}
                                    </td>

                                    <td>
                                        {application.client.consentRequired ? (
                                            application.clientScopesGranted.map(claim => (
                                                <span key={claim}>
                                                    {advancedMsg(claim)}
                                                    {claim !==
                                                        application.clientScopesGranted[
                                                            application.clientScopesGranted.length - 1
                                                        ] && ", "}
                                                </span>
                                            ))
                                        ) : (
                                            <strong>{msg("fullAccess")}</strong>
                                        )}
                                    </td>

                                    <td>
                                        {application.additionalGrants.map(grant => (
                                            <span key={grant}>
                                                {advancedMsg(grant)}
                                                {grant !==
                                                    application.additionalGrants[
                                                        application.additionalGrants.length - 1
                                                    ] && ", "}
                                            </span>
                                        ))}
                                    </td>

                                    <td>
                                        {(application.client.consentRequired &&
                                            application.clientScopesGranted.length > 0) ||
                                        application.additionalGrants.length > 0 ? (
                                            <button
                                                type="submit"
                                                className={kcClsx(
                                                    "kcButtonPrimaryClass",
                                                    "kcButtonClass"
                                                )}
                                                id={`revoke-${application.client.clientId}`}
                                                name="clientId"
                                                value={application.client.id}
                                            >
                                                {msg("revoke")}
                                            </button>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </Template>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isArrayWithEmptyObject(variable: any): boolean {
    return (
        Array.isArray(variable) &&
        variable.length === 1 &&
        typeof variable[0] === "object" &&
        Object.keys(variable[0]).length === 0
    );
}
