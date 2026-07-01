import {LoadingOverlay as SynthwaveLoadingOverlay} from "./Synthwave/LoadingOverlay";
import {LoadingOverlay as ClassicWoodLoadingOverlay} from "./ClassicWood/LoadingOverlay";
import SynthwaveMainTitle from "./Synthwave/MainTitle";
import ClassicWoodMainTitle from "./ClassicWood/MainTitle";
import {Theme} from "@mui/material/styles";
import ClassicWoodTheme from "./ClassicWood/theme";
import SynthwaveTheme from "./Synthwave/theme";
import {createContext, JSX} from "react";

export type MainTitleProps = {
    fontSize?: number | string;
    align?: "left" | "center" | "right";
};

export interface ThemeComponents {
    MainTheme: Theme;
    LoadingOverlay: () => JSX.Element | null;
    MainTitle: (props: MainTitleProps) => JSX.Element;
}

export const ThemeContext = createContext("");

export interface ThemeControl {
    // Sets the active theme and persists it for the logged-in user (the persist
    // is a no-op when unauthenticated — localStorage remains the fallback).
    setTheme: (themeName: string) => void;
    // Pulls the saved theme from the backend; the DB value wins on login.
    syncFromServer: () => void;
}

export const ThemeControlContext = createContext<ThemeControl>({
    setTheme: () => {},
    syncFromServer: () => {},
});

const Themes = new Map<string, ThemeComponents>();

Themes.set("Synthwave", {
    MainTheme: SynthwaveTheme,
    LoadingOverlay: SynthwaveLoadingOverlay,
    MainTitle: SynthwaveMainTitle,
});

Themes.set("ClassicWood", {
    MainTheme: ClassicWoodTheme,
    LoadingOverlay: ClassicWoodLoadingOverlay,
    MainTitle: ClassicWoodMainTitle,
});

export const GetThemes = (): string[] => {
    return Array.from(Themes.keys());
}

export const GetTheme = (themeName: string): ThemeComponents => {
    return Themes.get(themeName)!;
}