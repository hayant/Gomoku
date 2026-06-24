// Synthwave / Outrun neon palette
import {createTheme, alpha} from "@mui/material/styles";

const palette = {
    "NEON_CYAN": "#05d9e8",
    "NEON_MAGENTA": "#ff2a6d",
    "DEEP_SPACE": "#0d0221",
    "DEEP_PURPLE": "#1a0b2e",
}

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: palette.NEON_CYAN,
        },
        secondary: {
            main: palette.NEON_MAGENTA,
        },
        error: {
            main: "#ff3864",
        },
        background: {
            default: palette.DEEP_SPACE,
            paper: alpha(palette.DEEP_PURPLE, 0.72),
        },
        text: {
            primary: "#f5f5ff",
            secondary: "#b8a9d9",
        },
    },
    typography: {
        fontFamily: '"Orbitron", "Segoe UI", sans-serif',
        h1: { textTransform: "uppercase", letterSpacing: "0.08em" },
        h2: { textTransform: "uppercase", letterSpacing: "0.08em" },
        h3: { textTransform: "uppercase", letterSpacing: "0.08em" },
        h4: { textTransform: "uppercase", letterSpacing: "0.06em" },
        h5: { textTransform: "uppercase", letterSpacing: "0.06em" },
        h6: { textTransform: "uppercase", letterSpacing: "0.05em" },
        button: { letterSpacing: "0.08em" },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    minHeight: "100vh",
                    color: "#f5f5ff",
                    // Sunset gradient base
                    background: "linear-gradient(180deg, #0d0221 0%, #240b36 45%, #3a0a4a 62%, #c31432 100%)",
                    backgroundAttachment: "fixed",
                },
                // Perspective neon grid floor overlaid on the sunset
                "body::before": {
                    content: '""',
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "55vh",
                    pointerEvents: "none",
                    zIndex: 0,
                    backgroundImage: `
                        repeating-linear-gradient(to right, ${alpha(palette.NEON_CYAN, 0.45)} 0 2px, transparent 1px 80px),
                        repeating-linear-gradient(to bottom, ${alpha(palette.NEON_CYAN, 0.45)} 0 2px, transparent 1px 80px)`,
                    transform: "perspective(40vh) rotateX(62deg)",
                    transformOrigin: "center bottom",
                    maskImage: "linear-gradient(to bottom, transparent, #000 60%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 60%)",
                    "@media (prefers-reduced-motion: no-preference)": {
                        animation: "gridScroll 1.6s linear infinite",
                    },
                },
                // Scroll the pattern by exactly one 80px tile for a seamless loop
                "@keyframes gridScroll": {
                    from: { backgroundPosition: "center 0px" },
                    to: { backgroundPosition: "center 80px" },
                },
                // Keep app content above the grid floor
                "#root": {
                    position: "relative",
                    zIndex: 1,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    backgroundColor: alpha(palette.DEEP_PURPLE, 0.72),
                    border: `1px solid ${palette.NEON_CYAN}`,
                    borderRadius: 10,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0 0 18px ${alpha(palette.NEON_CYAN, 0.35)}, inset 0 0 12px ${alpha(palette.NEON_MAGENTA, 0.12)}`,
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    transition: "box-shadow 160ms ease, transform 120ms ease",
                },
                contained: {
                    color: "#0d0221",
                    boxShadow: `0 0 10px ${alpha(palette.NEON_CYAN, 0.6)}`,
                    "&:hover": {
                        boxShadow: `0 0 18px ${alpha(palette.NEON_CYAN, 0.95)}`,
                        transform: "translateY(-1px)",
                    },
                },
                outlined: {
                    borderColor: palette.NEON_MAGENTA,
                    color: palette.NEON_MAGENTA,
                    boxShadow: `0 0 8px ${alpha(palette.NEON_MAGENTA, 0.35)}`,
                    "&:hover": {
                        borderColor: palette.NEON_MAGENTA,
                        backgroundColor: alpha(palette.NEON_MAGENTA, 0.08),
                        boxShadow: `0 0 16px ${alpha(palette.NEON_MAGENTA, 0.8)}`,
                        transform: "translateY(-1px)",
                    },
                },
                text: {
                    "&:hover": {
                        backgroundColor: alpha(palette.NEON_CYAN, 0.08),
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha(palette.DEEP_SPACE, 0.85),
                    backgroundImage: "none",
                    borderRadius: 8,
                    border: `1px solid ${palette.NEON_MAGENTA}`,
                    boxShadow: `0 0 18px ${alpha(palette.NEON_MAGENTA, 0.45)}`,
                    backdropFilter: "blur(6px)",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(palette.NEON_CYAN, 0.55),
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.NEON_CYAN,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.NEON_MAGENTA,
                        boxShadow: `0 0 10px ${alpha(palette.NEON_MAGENTA, 0.55)}`,
                    },
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                thumb: {
                    boxShadow: `0 0 10px ${palette.NEON_CYAN}`,
                    "&:hover, &.Mui-focusVisible": {
                        boxShadow: `0 0 16px ${palette.NEON_CYAN}`,
                    },
                },
                track: {
                    boxShadow: `0 0 8px ${alpha(palette.NEON_CYAN, 0.6)}`,
                },
            },
        },
    },
});

export default theme;