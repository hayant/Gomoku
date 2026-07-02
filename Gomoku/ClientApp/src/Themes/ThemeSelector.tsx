import {AppBar, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip} from "@mui/material";
import React, {useContext, useState} from "react";
import {Check, Palette} from "@mui/icons-material";
import {GetThemes, ThemeContext, ThemeControlContext} from "./themes";

export const ThemeSelector = () => {
    const currentTheme = useContext(ThemeContext);
    const { setTheme } = useContext(ThemeControlContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleSelect = (themeName: string) => {
        setTheme(themeName);
        setAnchorEl(null);
    };

    return (
        // In normal document flow (not fixed/floating) so page content starts
        // below the bar instead of being overlapped on small viewports.
        <AppBar position="static" sx={{ borderRadius: 0 }}>
            <Toolbar variant="dense">
                <Box sx={{ flexGrow: 1 }} />
                <Tooltip title="Change theme">
                    <IconButton
                        aria-label="Change theme"
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        color="inherit"
                    >
                        <Palette />
                    </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                    {GetThemes().map((themeName) => (
                        <MenuItem
                            key={themeName}
                            selected={themeName === currentTheme}
                            onClick={() => handleSelect(themeName)}
                        >
                            <ListItemIcon>
                                {themeName === currentTheme && <Check fontSize="small" />}
                            </ListItemIcon>
                            <ListItemText>{themeName}</ListItemText>
                        </MenuItem>
                    ))}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
