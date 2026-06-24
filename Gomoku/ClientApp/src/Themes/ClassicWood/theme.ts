// Classic Gomoku: a warm wooden goban with black/white stones and ivory panels.
import {createTheme, alpha} from "@mui/material/styles";

const palette = {
    // Goban woods
    "WOOD_BOARD": "#d9b15e", // light goban surface
    "WOOD_DARK": "#5c3a1e",   // carved frame / borders
    "WOOD_MID": "#8a5a2b",    // mid-tone wood accents
    // Stones
    "INK_BLACK": "#1c1814",   // black stone & primary text
    "IVORY": "#f4ecd8",       // white stone & panels
    // Lacquer accent (traditional red seal / stone bowls)
    "LACQUER_RED": "#9c2b21",
}

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: palette.WOOD_DARK,
            contrastText: palette.IVORY,
        },
        secondary: {
            main: palette.LACQUER_RED,
            contrastText: palette.IVORY,
        },
        error: {
            main: "#b3261e",
        },
        background: {
            default: palette.WOOD_BOARD,
            paper: palette.IVORY,
        },
        text: {
            primary: palette.INK_BLACK,
            secondary: alpha(palette.INK_BLACK, 0.62),
        },
        divider: alpha(palette.WOOD_DARK, 0.35),
    },
    typography: {
        fontFamily: '"Georgia", "Iowan Old Style", "Times New Roman", serif',
        h1: { fontWeight: 700, letterSpacing: "0.01em" },
        h2: { fontWeight: 700, letterSpacing: "0.01em" },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { letterSpacing: "0.02em" },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    minHeight: "100vh",
                    color: palette.INK_BLACK,
                    // Warm wood base with a soft radial highlight, as if lit from above.
                    background: `radial-gradient(120% 90% at 50% 0%, ${alpha("#e8c089", 0.9)} 0%, ${palette.WOOD_BOARD} 45%, ${palette.WOOD_MID} 100%)`,
                    backgroundAttachment: "fixed",
                },
                // Subtle vertical wood grain streaked over the base colour.
                "body::before": {
                    content: '""',
                    position: "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    opacity: 0.5,
                    backgroundImage: `repeating-linear-gradient(
                        90deg,
                        ${alpha(palette.WOOD_DARK, 0.0)} 0px,
                        ${alpha(palette.WOOD_DARK, 0.06)} 2px,
                        ${alpha(palette.WOOD_DARK, 0.0)} 5px,
                        ${alpha(palette.WOOD_DARK, 0.0)} 26px,
                        ${alpha(palette.WOOD_DARK, 0.05)} 28px,
                        ${alpha(palette.WOOD_DARK, 0.0)} 32px)`,
                },
                // Keep app content above the grain overlay.
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
                    backgroundColor: palette.IVORY,
                    border: `1px solid ${alpha(palette.WOOD_DARK, 0.55)}`,
                    borderRadius: 8,
                    // Raised wooden panel: warm outer shadow + faint inner highlight.
                    boxShadow: `0 6px 18px ${alpha(palette.WOOD_DARK, 0.35)}, inset 0 1px 0 ${alpha("#ffffff", 0.6)}`,
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
                    textTransform: "none",
                    fontWeight: 700,
                    transition: "box-shadow 160ms ease, transform 120ms ease, background-color 160ms ease",
                },
                contained: {
                    color: palette.IVORY,
                    backgroundColor: palette.WOOD_DARK,
                    boxShadow: `0 3px 8px ${alpha(palette.WOOD_DARK, 0.4)}`,
                    "&:hover": {
                        backgroundColor: palette.WOOD_MID,
                        boxShadow: `0 5px 14px ${alpha(palette.WOOD_DARK, 0.5)}`,
                        transform: "translateY(-1px)",
                    },
                },
                outlined: {
                    borderColor: alpha(palette.WOOD_DARK, 0.7),
                    color: palette.WOOD_DARK,
                    "&:hover": {
                        borderColor: palette.WOOD_DARK,
                        backgroundColor: alpha(palette.WOOD_DARK, 0.08),
                        transform: "translateY(-1px)",
                    },
                },
                text: {
                    // No explicit colour: text buttons default to primary.main (WOOD_DARK)
                    // on light surfaces, while color="inherit" (e.g. on the dark AppBar)
                    // still resolves to the bar's ivory text.
                    "&:hover": {
                        backgroundColor: alpha(palette.WOOD_DARK, 0.08),
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    backgroundColor: palette.WOOD_DARK,
                    color: palette.IVORY,
                    borderRadius: 8,
                    border: `1px solid ${alpha("#000000", 0.25)}`,
                    boxShadow: `0 4px 12px ${alpha(palette.WOOD_DARK, 0.45)}`,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha("#ffffff", 0.5),
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(palette.WOOD_DARK, 0.45),
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.WOOD_DARK,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.WOOD_DARK,
                        borderWidth: 2,
                    },
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                rail: {
                    backgroundColor: alpha(palette.WOOD_DARK, 0.3),
                },
                track: {
                    border: "none",
                },
                thumb: {
                    backgroundColor: palette.IVORY,
                    border: `2px solid ${palette.WOOD_DARK}`,
                    boxShadow: `0 2px 6px ${alpha(palette.WOOD_DARK, 0.5)}`,
                    "&:hover, &.Mui-focusVisible": {
                        boxShadow: `0 0 0 8px ${alpha(palette.WOOD_DARK, 0.16)}`,
                    },
                },
            },
        },
    },
});

export default theme;
