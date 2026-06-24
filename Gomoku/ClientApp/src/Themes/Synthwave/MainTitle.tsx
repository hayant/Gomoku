import React from "react";
import {Box, useTheme, alpha} from "@mui/material";

type MainTitleProps = {
    fontSize?: number | string;
    align?: "left" | "center" | "right";
};

// Neon "GOMOKU" logo: Press Start 2P with layered cyan/magenta glow.
const MainTitle = ({ fontSize = "28px", align = "center" }: MainTitleProps) => {
    const theme = useTheme();

    return (
        <Box
            component="h1"
            sx={{
                m: 0,
                fontFamily: '"Press Start 2P", monospace',
                fontWeight: 400,
                fontSize,
                lineHeight: 1.4,
                textAlign: align,
                color: theme.palette.primary.main,
                letterSpacing: "0.04em",
                textShadow: `
                0 0 6px ${alpha(theme.palette.primary.main, 0.9)},
                0 0 14px ${alpha(theme.palette.primary.main, 0.6)},
                3px 3px 0 ${alpha(theme.palette.secondary.main, 0.85)}`,
            }}
        >
            Gomoku
        </Box>
    )
}

export default MainTitle;
