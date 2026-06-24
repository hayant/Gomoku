import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import LoadingOverlay from "../Themes/Synthwave/LoadingOverlay";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/press-start-2p/400.css";
import theme from "../Themes/Synthwave/theme";

const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);
    root.render(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
            <LoadingOverlay />
        </ThemeProvider>);
}

