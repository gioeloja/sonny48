import {
    createContext,
    PropsWithChildren,
    useReducer,
    useEffect
} from "react";

import GameReducer from "../reducer/reducer";
import { initialState, TileSettings } from "../reducer/reducer";
import { getRedirectStatusCodeFromError } from "next/dist/client/components/redirect";

export const GameContext = createContext({
    score: 0,
    getTiles: () => ({}),
    moveTiles: (direction: "left" | "right" | "up" | "down") => {},
    generateRandomTile: () => {},
    start: () => {},
    resetGame: () => {},
});



export default function GameProvider({ children }: PropsWithChildren) {
    const [gameState, dispatch] = useReducer(GameReducer, initialState);

    const getTiles = () => {
        return gameState.tiles;
    };

    const moveTiles = (direction: "left" | "right" | "up" | "down") => {
        dispatch({ type: `move_${direction}` });
    };

    useEffect(() => {
        if (gameState.boardChanged) {
            if (gameState.hasChanged.size != 0) {
              setTimeout(() => {
                dispatch({ type: "remove_merged_tiles" });
              }, 100);
            }
            generateRandomTile()
        }
      }, [gameState.boardChanged]);

    const getEmptyCells = () => {
        const res: [number, number][] = []
        for (let i = 0; i < gameState.board.length; i++) {
            for (let j = 0; j < gameState.board[i].length; j++) {
                if (gameState.board[i][j] === "0") {
                    res.push([i, j]);
                }
            }
        }
        return res; 
    }

    const generateRandomTile = () => {
        const emptyCells: [number, number][] = getEmptyCells();
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell: [number, number] = emptyCells[randomIndex];
        
        // Generate a random number between 0 and 1
        const randomNumber = Math.random();
        
        // Set the value based on the random number
        let value: number;
        if (randomNumber < 0.7) {
            value = 2; // 70% chance of being 2
        } else {
            value = 4; // 30% chance of being 4
        }
        
        const tile: TileSettings = { 
            value, 
            xcoordinate: randomCell[0], 
            ycoordinate: randomCell[1], 
            justSpawned: true, 
            hasChanged: false
        };
        
        dispatch({ type: "create_tile", tile });
    };
    
    const start = () => {
        generateRandomTile()
    }

    const resetGame = () => {
        console.log("RESETTING")
        dispatch({ type: "reset_game" });
    }

    return (
        <GameContext.Provider value={{ 
            score: gameState.score,
            getTiles,
            moveTiles,
            generateRandomTile,
            start,
            resetGame,
        }}>
            {children}
        </GameContext.Provider>
    );
};