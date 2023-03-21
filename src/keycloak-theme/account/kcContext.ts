import { getKcContext } from "keycloakify/account";

export type KcContextExtension =
	| { pageId: "my-extra-page-1.ftl"; }
	| { pageId: "my-extra-page-2.ftl"; someCustomValue: string; };

export const { kcContext } = getKcContext<KcContextExtension>({
	//mockPageId: "password.ftl",
	mockData: [
		{
			pageId: "my-extra-page-2.ftl", 
			someCustomValue: "foo bar"
		}
	]
});

export type KcContext = NonNullable<typeof kcContext>;