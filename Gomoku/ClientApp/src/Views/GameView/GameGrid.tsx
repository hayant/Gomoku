import React from "react";
import "./Styles/Grid.css";
import {Box, Grid, Button, Typography, useTheme, alpha} from "@mui/material";
import {CellValue} from "../../Data/CellValue";

const cellSize = 30;

type CellProps = {
    row: number;
    col: number;
    value: CellValue;
    onClick: (r: number, c: number) => void;
};

type GridProps = {
    size?: number;
    values?: CellValue[][];
    onCellClick: (r: number, c: number) => void;
    renderCell?: (r: number, c: number, value: CellValue) => React.ReactNode;
};

const Cell = React.memo(({ row, col, value, onClick }: CellProps) => {
    return (
        <Grid>
            <Button
                variant="outlined"
                sx={{
                    aspectRatio: "1 / 1",
                    minWidth: 40,
                    fontSize: "1.5rem",
                    padding: 0,
                    margin: 0,
                    lineHeight: 1,
                }}
                onClick={() => onClick(row, col)}
                aria-label={`cell-${row}-${col}`}
                data-row={row}
                data-col={col}
            >
                <Typography variant="h5" component="center">
                    {value.mark ?? ""}
                </Typography>
            </Button>
        </Grid>
    );
});

const GameGrid = ({ size = 10, values, onCellClick }: GridProps) => {
    const rows = Array.from({ length: size }, (_, r) =>
        Array.from({ length: size }, (_, c) => values?.[r]?.[c] ?? null)
    );

    const theme = useTheme();

    const markColor = (mark: string | null | undefined) =>
        mark === "X" ? theme.palette.primary.main : theme.palette.secondary.main;

    return (
        <Box
            overflow="auto"
            display="flex"
            justifyContent="center"
            width="100%"
        >
            <Box
                display="grid"
                gridTemplateColumns={`repeat(${size}, ${cellSize}px)`}
                overflow="auto"
            >
                {rows.flatMap((rowArr, r) =>
                    rowArr.map((val, c) => (
                        <Button
                            key={`${r}-${c}`}
                            variant="outlined"
                            sx={{
                                aspectRatio: "1 / 1",
                                width: cellSize,
                                fontSize: "1.5rem",
                                padding: 0,
                                minWidth: 0,
                                borderRadius: 0,
                                borderColor: alpha(theme.palette.primary.main, 0.35),
                                color: markColor(val?.mark),
                                backgroundColor: val?.latest
                                    ? alpha(theme.palette.secondary.main, 0.18)
                                    : alpha(theme.palette.background.default, 0.55),
                                boxShadow: val?.latest
                                    ? `inset 0 0 10px ${theme.palette.secondary.main}`
                                    : "none",
                                "&:hover": {
                                    borderColor: theme.palette.primary.main,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                                    boxShadow: `inset 0 0 8px ${alpha(theme.palette.primary.main, 0.6)}`,
                                },
                            }}
                            onClick={() => onCellClick(r, c)}
                        >
                            <Typography
                                variant="h5"
                                component="span"
                                fontSize="80%"
                                sx={{
                                    fontWeight: 700,
                                    color: markColor(val?.mark),
                                    textShadow: val?.mark
                                        ? `0 0 8px ${markColor(val?.mark)}`
                                        : "none",
                                }}
                            >
                                {val?.mark ?? ""}
                            </Typography>
                        </Button>
                    ))
                )}
            </Box>
        </Box>
    );
};

export default GameGrid;