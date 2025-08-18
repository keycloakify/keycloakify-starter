import { useReducer } from "react";

export function LinkDisabledOnceClicked(
    props: React.ComponentProps<"a"> & {
        renderLink: (props: {
            anchorProps: React.ComponentProps<"a">;
            isDisabled: boolean;
        }) => React.ReactNode;
    }
) {
    const { renderLink, ...anchorProps } = props;

    const [hasBeenClicked, setClicked] = useReducer(() => true, false);

    return (
        <>
            {renderLink({
                anchorProps: {
                    ...anchorProps,
                    "aria-disabled": !hasBeenClicked ? anchorProps["aria-disabled"] : true,
                    role: !hasBeenClicked ? anchorProps.role : "link",
                    href: !hasBeenClicked ? anchorProps.href : "#",
                    onClick: !hasBeenClicked
                        ? e => {
                              setClicked();
                              return anchorProps.onClick?.(e);
                          }
                        : undefined
                },
                isDisabled: hasBeenClicked
            })}
        </>
    );
}
