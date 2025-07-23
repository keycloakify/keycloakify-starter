import type { ReactNode } from "react";

type Props = {
    headerNode: ReactNode;
    children: ReactNode;
};

export function Main(props: Props){

    const { headerNode, children } = props;


    return (
        <main className={kcClsx("kcLoginMain")}>
            <div className={kcClsx("kcLoginMainHeader")}>
                <h1 className={kcClsx("kcLoginMainTitle")} id="kc-page-title">
                    {headerNode}
                </h1>
                <LanguageSelect />
            </div>

            <div className={kcClsx("kcLoginMainBody")}>
            </div>

            <div className={kcClsx("kcLoginMainFooter")}>
            </div>
        </main>
    );

}