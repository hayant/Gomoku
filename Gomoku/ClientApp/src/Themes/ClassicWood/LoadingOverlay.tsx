import React from "react";
import {Box, useTheme, alpha} from "@mui/material";
import { keyframes } from "@mui/system";
import { RequestActivity } from "../../Helpers/RequestActivity";

// A black and a white stone orbiting one another, like stones being placed on the goban.
const orbit = keyframes`
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
`;

// Subscribe to the in-flight request count via React's external store API so the
// overlay shows whenever any HTTP request is pending and hides once they settle.
const subscribe = (onChange: () => void) => RequestActivity.subscribe(onChange);
const getSnapshot = () => RequestActivity.getCount();

const LoadingOverlay = () => {
    const inFlight = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

    const theme = useTheme();

    if (inFlight <= 0) {
        return null;
    }

    const stoneShadow = `0 2px 4px ${alpha("#000000", 0.45)}`;

    return (
        <Box
            role="status"
            aria-live="polite"
            aria-label="Loading"
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: (theme) => theme.zIndex.modal + 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                backgroundColor: alpha(theme.palette.background.default, 0.6),
                backdropFilter: "blur(3px)",
                pointerEvents: "all",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: 72,
                    height: 72,
                    animation: `${orbit} 1.2s linear infinite`,
                }}
            >
                {/* Black stone */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: `radial-gradient(circle at 35% 30%, #4a4038 0%, #1c1814 60%, #000000 100%)`,
                        boxShadow: stoneShadow,
                    }}
                />
                {/* White stone */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: `radial-gradient(circle at 35% 30%, #ffffff 0%, #f4ecd8 55%, #d9c9a8 100%)`,
                        boxShadow: stoneShadow,
                    }}
                />
            </Box>
            <Box
                sx={{
                    fontFamily: '"Georgia", "Iowan Old Style", "Times New Roman", serif',
                    fontSize: "14px",
                    fontStyle: "italic",
                    letterSpacing: "0.18em",
                    color: theme.palette.primary.main,
                }}
            >
                Loading…
            </Box>
        </Box>
    );
};

export default LoadingOverlay;
