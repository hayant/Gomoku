import React from "react";
import {Box, useTheme, alpha} from "@mui/material";
import { keyframes } from "@mui/system";
import { RequestActivity } from "../../Helpers/RequestActivity";

// Two neon rings counter-rotating, with a soft pulse on the glow.
const spin = keyframes`
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
`;

const spinReverse = keyframes`
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
`;

const pulse = keyframes`
    0%, 100% { opacity: 0.55; }
    50%      { opacity: 1; }
`;

// Subscribe to the in-flight request count via React's external store API so the
// overlay shows whenever any HTTP request is pending and hides once they settle.
const subscribe = (onChange: () => void) => RequestActivity.subscribe(onChange);
const getSnapshot = () => RequestActivity.getCount();

export const LoadingOverlay = () => {
    const inFlight = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

    const theme = useTheme();

    if (inFlight <= 0) {
        return null;
    }

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
                backgroundColor: alpha(theme.palette.background.default, 0.55),
                backdropFilter: "blur(3px)",
                pointerEvents: "all",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: 84,
                    height: 84,
                    animation: `${pulse} 1.4s ease-in-out infinite`,
                }}
            >
                {/* Outer cyan ring */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: "3px solid transparent",
                        borderTopColor: theme.palette.primary.main,
                        borderRightColor: theme.palette.primary.main,
                        boxShadow: `0 0 14px ${theme.palette.primary.main}, inset 0 0 10px ${alpha(theme.palette.primary.main, 0.4)}`,
                        animation: `${spin} 1s linear infinite`,
                    }}
                />
                {/* Inner magenta ring, counter-rotating */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: "16px",
                        borderRadius: "50%",
                        border: "3px solid transparent",
                        borderBottomColor: theme.palette.secondary.main,
                        borderLeftColor: theme.palette.secondary.main,
                        boxShadow: `0 0 14px ${theme.palette.secondary.main}, inset 0 0 10px ${alpha(theme.palette.secondary.main, 0.4)}`,
                        animation: `${spinReverse} 0.8s linear infinite`,
                    }}
                />
            </Box>
            <Box
                sx={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    color: theme.palette.primary.main,
                    textShadow: `0 0 6px ${alpha(theme.palette.primary.main, 0.9)}, 2px 2px 0 ${alpha(theme.palette.secondary.main, 0.7)}`,
                    animation: `${pulse} 1.4s ease-in-out infinite`,
                }}
            >
                Loading
            </Box>
        </Box>
    );
};

