import { memo } from "react";
import Template from "keycloakify/lib/components/Template";
import type { KcProps } from "keycloakify";
import { useDownloadTerms } from "keycloakify";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import { evtTermMarkdown } from "keycloakify/lib/components/Terms";
import { useRerenderOnStateChange } from "evt/hooks";
import tos_en_url from "./tos_en.md";
import tos_fr_url from "./tos_fr.md";
import { clsx } from "keycloakify/lib/tools/clsx";

/**
 * NOTE: Yo do not need to do all this to put your own Terms and conditions
 * this is if you want component level customization.  
 * If the default works for you you can just use the useDownloadTerms hook 
 * in the KcApp.tsx
 * Example: https://github.com/garronej/keycloakify-starter/blob/a20c21b2aae7c6dc6dbea294f3d321955ddf9355/src/KcApp/KcApp.tsx#L14-L30
 */

type KcContext_Terms = Extract<KcContext, { pageId: "terms.ftl" }>;

const Terms = memo(
	({
		kcContext,
		i18n,
		...props
	}: { kcContext: KcContext_Terms; i18n: I18n } & KcProps) => {
		const { url } = kcContext;

		useDownloadTerms({
			kcContext,
			"downloadTermMarkdown": async ({ currentLanguageTag }) => {

				const markdownString = await fetch((() => {
					switch (currentLanguageTag) {
						case "fr": return tos_fr_url;
						default: return tos_en_url;
					}
				})()).then(response => response.text());

				return markdownString;
			},
		});

		useRerenderOnStateChange(evtTermMarkdown);

		if (evtTermMarkdown.state === undefined) {
			return null;
		}

		const { msg, msgStr } = i18n;

		return (
			<Template
				{...{ kcContext, i18n, ...props }}
				doFetchDefaultThemeResources={true}
				displayMessage={false}
				headerNode={msg("termsTitle")}
				formNode={
					<>
						<div id="kc-terms-text">{evtTermMarkdown.state}</div>
						<form className="form-actions" action={url.loginAction} method="POST">
							<input
								className={clsx(
									props.kcButtonClass,
									props.kcButtonClass,
									props.kcButtonClass,
									props.kcButtonPrimaryClass,
									props.kcButtonLargeClass
								)}
								name="accept"
								id="kc-accept"
								type="submit"
								value={msgStr("doAccept")}
							/>
							<input
								className={clsx(props.kcButtonClass, props.kcButtonDefaultClass, props.kcButtonLargeClass)}
								name="cancel"
								id="kc-decline"
								type="submit"
								value={msgStr("doDecline")}
							/>
						</form>
						<div className="clearfix" />
					</>
				}
			/>
		);

	},
);

export default Terms;
