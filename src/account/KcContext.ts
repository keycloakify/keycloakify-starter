/* eslint-disable @typescript-eslint/ban-types */
import type { ExtendKcContext } from "keycloakify/account";

export type KcContextExtraProperties = {};

export type KcContextExtraPropertiesPerPage = {};

export type KcContext = ExtendKcContext<KcContextExtraProperties, KcContextExtraPropertiesPerPage>;
