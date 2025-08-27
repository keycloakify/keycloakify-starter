import { useEffect, useState } from "react";
import { useEnvironment } from "../shared/keycloak-ui-shared";

export function AutoLogoutWarningOverlay() {
    const { keycloak } = useEnvironment();

    const [secondsLeft, setSecondsLeft] = useState<number | undefined>(undefined);

    useEffect(() => {
        const { unsubscribeFromAutoLogoutCountdown } =
            keycloak.subscribeToAutoLogoutCountdown(({ secondsLeft }) =>
                setSecondsLeft(
                    secondsLeft === undefined || secondsLeft > 50
                        ? undefined
                        : secondsLeft
                )
            );

        return () => {
            unsubscribeFromAutoLogoutCountdown();
        };
    }, []);

    if (secondsLeft === undefined) {
        return null;
    }

    return (
        <div
            // Full screen overlay, blurred background
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(10px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
            }}
        >
            <div>
                <p>Are you still there?</p>
                <p>
                    You will be logged out in <strong>{secondsLeft}</strong> seconds.
                </p>
            </div>
        </div>
    );
}
