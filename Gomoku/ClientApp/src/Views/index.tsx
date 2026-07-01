import React, {useCallback, useEffect, useMemo, useState} from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {ThemeProvider} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/press-start-2p/400.css";
import {GetTheme, GetThemes, ThemeContext, ThemeControlContext} from "../Themes/themes";
import {ThemeSelector} from "../Themes/ThemeSelector";
import {HttpHelpers} from "../Helpers/HttpHelpers";

const container = document.getElementById("root");

const THEME_STORAGE_KEY = "gomoku-theme";

const RootView = () => {
    // The theme registry is static, so memoize once: this keeps `themes` a stable
    // reference, which in turn lets syncFromServer's useCallback actually memoize
    // (otherwise the load effect below would re-run on every render).
    const themes = useMemo(() => GetThemes(), []);
    const [theme, setTheme] = useState<string>(() => {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        return saved && themes.includes(saved) ? saved : themes[0];
    });

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    // Persist a theme choice to the backend for the logged-in user. On the login
    // screen (unauthenticated) this 401s; we swallow it and let localStorage stay
    // the source of truth until the user logs in.
    const persistTheme = (themeName: string) => {
        HttpHelpers.makeRequest("/api/Settings/theme", "PUT", { theme: themeName })
            .catch(() => { /* anon or offline: localStorage is the fallback */ });
    };

    const setThemeAndPersist = (themeName: string) => {
        setTheme(themeName);
        persistTheme(themeName);
    };

    // Adopt the saved theme for the authenticated user. The DB value wins over the
    // local one, and the localStorage effect above keeps the two in sync. Unknown
    // or stale values are ignored, as is the unauthenticated (401) case.
    const syncFromServer = useCallback(() => {
        HttpHelpers.makeRequest<{ theme: string | null }>("/api/Settings/theme", "GET")
            .then((res) => {
                if (res?.theme && themes.includes(res.theme)) {
                    setTheme(res.theme);
                }
            })
            .catch(() => { /* not logged in: keep localStorage */ });
    }, [themes]);

    useEffect(() => {
        // On load, adopt the stored theme if a session cookie is already present
        // (e.g. a page refresh while logged in). After a fresh login, LoginForm
        // triggers this again via ThemeControlContext.
        syncFromServer();
    }, [syncFromServer]);

    const currentTheme = GetTheme(theme);

    return (
        <ThemeControlContext value={{ setTheme: setThemeAndPersist, syncFromServer }}>
            <ThemeContext value={theme}>
                <ThemeProvider theme={GetTheme(theme).MainTheme}>
                    <CssBaseline />
                        <ThemeSelector />
                        <App />
                        <currentTheme.LoadingOverlay />
                </ThemeProvider>
            </ThemeContext>
        </ThemeControlContext>);
}

if (container) {
    const root = createRoot(container);

    root.render(
        <RootView />,
    );
}
