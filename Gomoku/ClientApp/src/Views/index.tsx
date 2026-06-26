import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {ThemeProvider} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/press-start-2p/400.css";
import {GetTheme, GetThemes, ThemeContext} from "../Themes/themes";
import {ThemeSelector} from "../Themes/ThemeSelector";

const container = document.getElementById("root");

const THEME_STORAGE_KEY = "gomoku-theme";

const RootView = () => {
    const themes = GetThemes();
    const [theme, setTheme] = useState<string>(() => {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        return saved && themes.includes(saved) ? saved : themes[0];
    });

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const currentTheme = GetTheme(theme);

    return (
        <ThemeContext value={theme}>
            <ThemeProvider theme={GetTheme(theme).MainTheme}>
                <CssBaseline />
                    <ThemeSelector setTheme={setTheme} />
                    <App />
                    <currentTheme.LoadingOverlay />
            </ThemeProvider>
        </ThemeContext>);
}

if (container) {
    const root = createRoot(container);

    root.render(
        <RootView />,
    );
}
