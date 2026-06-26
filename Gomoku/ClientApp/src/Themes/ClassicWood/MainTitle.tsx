import React from "react";
import {Box, useTheme, alpha} from "@mui/material";
import {MainTitleProps} from "../themes";

// "Gomoku" carved into the wood: an elegant serif with an engraved/letterpress
// effect — a dark inset shadow above and a faint highlight below.
const MainTitle = ({ fontSize = "28px", align = "center" }: MainTitleProps) => {
    const theme = useTheme();

    return (
        <Box
            component="h1"
            sx={{
                m: 0,
                fontFamily: '"Georgia", "Iowan Old Style", "Times New Roman", serif',
                fontWeight: 700,
                fontSize,
                lineHeight: 1.3,
                textAlign: align,
                letterSpacing: "0.04em",
                color: theme.palette.primary.main,
                // Engraved look: shadow pushed up/in, highlight catching the lower edge.
                textShadow: `
                0 -1px 1px ${alpha("#000000", 0.55)},
                0 1px 0 ${alpha("#ffffff", 0.45)}`,
            }}
        >
            Gomoku
        </Box>
    )
}

export default MainTitle;
