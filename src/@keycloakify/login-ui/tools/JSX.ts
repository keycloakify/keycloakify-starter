

import type { ReactElement, JSXElementConstructor } from "react";

// NOTE: Polyfill of the type that works both with React 18 and React 19 types definitions.
export namespace JSX {
    export type Element = ReactElement<unknown, string | JSXElementConstructor<any>>;
}