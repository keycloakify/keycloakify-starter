import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {ftlValuesGlobalName} from 'keycloakify/bin/keycloakify/ftlValuesGlobalName'
import * as crypto from 'crypto'
import cheerio from "cheerio";

const htmlPlugin = ()=>{
    return {
        name:'html-plugin',
        transformIndexHtml(html){
            return html.replace('/assets','${url.resourcesPath}/build/static')
        }
    }
}
function replaceImportsInCssCode(params: { cssCode: string }): {
    fixedCssCode: string;
    cssGlobalsToDefine: Record<string, string>;
} {
    const { cssCode } = params;

    const cssGlobalsToDefine: Record<string, string> = {};

    new Set(cssCode.match(/url\(["']?\/[^/][^)"']+["']?\)[^;}]*/g) ?? []).forEach(
        match => (cssGlobalsToDefine["url" + crypto.createHash("sha256").update(match).digest("hex").substring(0, 15)] = match)
    );

    let fixedCssCode = cssCode;

    Object.keys(cssGlobalsToDefine).forEach(
        cssVariableName =>
            //NOTE: split/join pattern ~ replace all
            (fixedCssCode = fixedCssCode.split(cssGlobalsToDefine[cssVariableName]).join(`var(--${cssVariableName})`))
    );

    return { fixedCssCode, cssGlobalsToDefine };
}

function generateCssCodeToDefineGlobals(params: { cssGlobalsToDefine: Record<string, string>; }): {
    cssCodeToPrependInHead: string;
} {
    const { cssGlobalsToDefine,  } = params;

    return {
        "cssCodeToPrependInHead": [
            ":root {",
            ...Object.keys(cssGlobalsToDefine)
                .map(cssVariableName =>
                    [
                        `--${cssVariableName}:`,
                        cssGlobalsToDefine[cssVariableName].replace(
                            new RegExp(`url\\(${("/").replace(/\//g, "\\/")}`, "g"),
                            "url(${url.resourcesPath}/build/"
                        )
                    ].join(" ")
                )
                .map(line => `    ${line};`),
            "}"
        ].join("\n")
    };
}


const keycloakifyGlobalCssAccumulatorPlugin = () => {
    let cssGlobalsToDefine = {}

    return {
        name: 'keycloakify-global-css-accumulator-plugin',
        apply: 'build',
        transform: (src, id) => {
            if (id.endsWith('.css')) {
                const { cssGlobalsToDefine: localGlobal, fixedCssCode} = replaceImportsInCssCode({cssCode: src})
                cssGlobalsToDefine = {...cssGlobalsToDefine, ...localGlobal}
                return {
                    code: fixedCssCode
                }
            }
        },
        transformIndexHtml(html) {
            if (Object.keys(cssGlobalsToDefine).length === 0) return html

            const $ = cheerio.load(html)
            // @ts-ignore
            $("head").prepend(
                [
                    "",
                    "<style>",
                    generateCssCodeToDefineGlobals({
                        cssGlobalsToDefine,
                    }).cssCodeToPrependInHead,
                    "</style>",
                    ""
                ].join("\n")
            );
            return $.html();
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), htmlPlugin(), keycloakifyGlobalCssAccumulatorPlugin()],
    assetsInclude:'**/*.md',
    // base:'/',
    define:{
        'process.env': {}
    },
    build:{
        outDir:'build',
        target:'es2015',
        assetsDir: 'static'
    },
    experimental: {
        renderBuiltUrl(filename, {hostType}) {
            if ((hostType) === 'js')
                return { runtime: `window.${ftlValuesGlobalName}.url.resourcesPath + "/build/" + ${JSON.stringify(filename)}`}
            return { relative: true }
        }
    }
})
