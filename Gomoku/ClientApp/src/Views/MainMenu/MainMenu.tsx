import React, {useContext, useState} from "react";
import {GameViewProps} from "../GameView/GameView";
import {useNavigate} from "react-router";
import {HttpHelpers} from "../../Helpers/HttpHelpers";
import {Authorization} from "../../Helpers/Authorization";
import {Box, Button, Container, Paper, Slider, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import {GameMode} from "../../Data/GameMode";
import {GetTheme, ThemeContext} from "../../Themes/themes";

function MainMenu(){
    const [user, setUser] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(3);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [unfinishedGame, setUnfinishedGame] = useState<{gameId: number, difficulty: number} | null>(null);
    // Which mode the "Continue Game?" dialog is deciding for (single player vs local two-player)
    const [pendingMode, setPendingMode] = useState<GameMode>(GameMode.SinglePlayer);

    const themeName = useContext(ThemeContext);
    const currentTheme = GetTheme(themeName);

    const navigate = useNavigate();

    Authorization.checkAuthentication(setUser);
    
    const handleQuit = () => {
        HttpHelpers.makeRequest("api/Login/logout", "POST").then(result => {
            navigate("/");
        })
    }
    
    const handleGameStart = async (singlePlayer: boolean) => {
        const mode = singlePlayer ? GameMode.SinglePlayer : GameMode.LocalMultiplayer;
        const endpoint = singlePlayer
            ? "/api/Game/CheckUnfinishedGame"
            : "/api/Game/CheckUnfinishedLocalGame";
        setPendingMode(mode);

        // Check for an unfinished game of this mode; offer to continue it if one exists
        try {
            const result = await HttpHelpers.makeRequest<{gameId: number, difficulty: number} | null>(
                endpoint,
                "GET"
            );
            if (result) {
                setUnfinishedGame(result);
                setDialogOpen(true);
                return;
            }
        } catch (error) {
            console.error("Failed to check for unfinished game:", error);
        }

        // No unfinished game found, start new game
        startNewGame(mode);
    }

    const startNewGame = (mode: GameMode = pendingMode) => {
        const gameViewProps: GameViewProps = mode === GameMode.SinglePlayer
            ? { gameMode: GameMode.SinglePlayer, difficulty: difficulty }
            : { gameMode: GameMode.LocalMultiplayer, difficulty: undefined };
        setDialogOpen(false);
        navigate("/app/game", { state: gameViewProps });
    }

    const continueExistingGame = () => {
        if (unfinishedGame) {
            const gameViewProps: GameViewProps = pendingMode === GameMode.SinglePlayer
                ? {
                    gameMode: GameMode.SinglePlayer,
                    difficulty: unfinishedGame.difficulty,
                    gameId: unfinishedGame.gameId,
                }
                : {
                    gameMode: GameMode.LocalMultiplayer,
                    gameId: unfinishedGame.gameId,
                };
            navigate("/app/game", { state: gameViewProps });
        }
        setDialogOpen(false);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setUnfinishedGame(null);
    }

    const handleOnlineLobby = () => {
        navigate("/app/online");
    }
    
    const mainMenu = () => {
        return (
            <Container style={{ width: 400, alignContent: "center" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                    }}
                >
                    <div>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                mb: 2,
                                width: "100%",
                                maxWidth: 400,
                                borderRadius: 3,
                            }}
                        >
                            <currentTheme.MainTitle fontSize="26px" />
                            <Typography variant="h6" align="center" gutterBottom sx={{ mt: 2 }}>
                                Welcome, {user}!
                            </Typography>
                        </Paper>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                width: "100%",
                                maxWidth: 400,
                                borderRadius: 3,
                            }}
                        >
                            <Typography variant="h5" align="center" gutterBottom>
                                Game menu
                            </Typography>
                            <Stack spacing={2}>
                                <Typography variant="h6" align="left" style={{marginTop: "20px"}}>
                                    Difficulty
                                </Typography>
                                <Slider
                                    aria-label="Difficulty"
                                    value={difficulty}
                                    onChange={(_, value) => setDifficulty(value as number)}
                                    getAriaValueText={value => value.toString()}
                                    valueLabelDisplay="auto"
                                    style={{ marginTop: "0px", marginBottom: "10px" }}
                                    step={1}
                                    marks
                                    min={1}
                                    max={5}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    onClick={() => handleGameStart(true)}
                                >
                                    1 Player
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    onClick={() => handleGameStart(false)}
                                >
                                    2 Player Local
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    onClick={handleOnlineLobby}
                                >
                                    Online Lobby
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                    onClick={handleQuit}
                                    style={{marginTop: "30px"}}
                                >
                                    Quit
                                </Button>
                            </Stack>
                        </Paper>
                    </div>
                </Box>
            </Container>
        );
    }
    
    return (
        <>
            {mainMenu()}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Continue Game?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Start a new game or continue the existing game?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => startNewGame()}>Start new</Button>
                    <Button onClick={continueExistingGame} variant="contained">Continue existing</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default MainMenu;