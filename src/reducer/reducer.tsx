import { uid } from "uid";

export type TileSettings = {
  value: number;
  xcoordinate: number;
  ycoordinate: number;
  justSpawned: boolean;
  hasChanged: boolean;
};

export type TileStorage = { [id: string]: TileSettings };

type State = {
  board: string[][];
  tiles: TileStorage;
  hasChanged: Set<string>; // Update the type to Set<number>
  score: number;
  boardChanged: boolean;
  isLost: boolean;
};

type Action =
  | { type: "create_tile"; tile: TileSettings }
  | { type: "remove_merged_tiles" }
  | { type: "move_up" }
  | { type: "move_down" }
  | { type: "move_left" }
  | { type: "move_right" }
  | { type: "reset_game" };

function createBoard(): string[][] {
  const board: string[][] = []; // each position on board is uid of the tile that is at this position

  for (let i = 0; i < 4; i += 1) {
    board[i] = new Array(4).fill("0");
  }

  return board;
}

function boardsEqual(board1: string[][], board2: string[][]): boolean {
  if (board1.length !== board2.length || board1[0].length !== board2[0].length) {
    return false;
  }

  for (let i = 0; i < board1.length; i++) {
    for (let j = 0; j < board1[i].length; j++) {
      if (board1[i][j] !== board2[i][j]) {
        return false;
      }
    }
  }

  return true;
}

function hasAdjacentNumbers(arr: number[][]) {
  const rows = arr.length;
  const cols = arr[0].length;

  // Check horizontally
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols - 1; j++) {
      if (arr[i][j] === arr[i][j + 1]) {
        return true;
      }
    }
  }

  // Check vertically
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols; j++) {
      if (arr[i][j] === arr[i + 1][j]) {
        return true;
      }
    }
  }

  return false;
}

export const initialState: State = {
  board: createBoard(),
  tiles: {},
  hasChanged: new Set<string>(),
  score: 0,
  boardChanged: false,
  isLost: false,
};

export default function GameReducer(
  state: State = initialState,
  action: Action
) {
  let { score } = state;
  switch (action.type) {
    case "create_tile":
      const newBoard = JSON.parse(JSON.stringify(state.board));
      const tileID = uid();
      newBoard[action.tile.xcoordinate][action.tile.ycoordinate] = tileID;
      const updatedHasChanged = new Set(state.hasChanged); // Create a new set based on the existing one
      updatedHasChanged.add(tileID);

      // Check if the board is completely full
      let isBoardFull = true;
      for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard[i].length; j++) {
          if (newBoard[i][j] === '0') {
            isBoardFull = false;
            break;
          }
        }
        
        // Create numeric representation of board
        if (!isBoardFull) {
          break
        }
      }

      let newIsLost = false
      if (isBoardFull) {
      let numericBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (let i = 0; i < newBoard.length; i++) {
          for (let j = 0; j < newBoard[i].length; j++) {
            const currID = newBoard[i][j]
            if (currID == tileID) {
              numericBoard[i][j] = action.tile.value
            }
            else {
              numericBoard[i][j] = state.tiles[currID].value
            }
          }
        }
        newIsLost = !hasAdjacentNumbers(numericBoard)
      }

          
      

      return {
        ...state,
        board: newBoard,
        tiles: {
          ...state.tiles,
          [tileID]: action.tile,
        },
        hasChanged: updatedHasChanged,
        boardChanged: false,
        isLost: newIsLost
      };
    case "remove_merged_tiles":
      const tilesSubset: { [id: string]: TileSettings } = {};
      for (let row = 0; row < state.board.length; row++) {
        for (let col = 0; col < state.board[row].length; col++) {
          const tileID = state.board[row][col];
          tilesSubset[tileID] = state.tiles[tileID];
        }
      }
      return {
        ...state,
        tiles: tilesSubset,
      };
    case "move_left":
      const newBoardLeft = createBoard();
      const newTilesLeft: { [id: string]: TileSettings } = {};
      const newHasChangedLeft = new Set<string>();
      for (let col = 0; col < 4; col++) {
        let new_row = 0; // Initialize new_col inside the row loop
        for (let row = 0; row < 4; row++) {
          const currID = state.board[row][col];
          if (currID !== "0") {
            // Check if a tile exists on this position
            if (
              new_row > 0 &&
              state.tiles[newBoardLeft[new_row - 1][col]].value ==
                state.tiles[currID].value &&
              !newHasChangedLeft.has(newBoardLeft[new_row - 1][col])
            ) {
              new_row = new_row - 1;
              newHasChangedLeft.add(currID);
              newTilesLeft[currID] = {
                value: state.tiles[currID].value * 2,
                xcoordinate: new_row,
                ycoordinate: col,
                hasChanged: true,
                justSpawned: false,
              };
              score += state.tiles[currID].value * 2;
            } else {
              newTilesLeft[currID] = {
                value: state.tiles[currID].value,
                xcoordinate: new_row,
                ycoordinate: col,
                hasChanged: false,
                justSpawned: false,
              };
            }

            newBoardLeft[new_row][col] = currID;
            new_row++;
          }
        }
      }
      let boardChangedLeft = false;
      if (!boardsEqual(state.board, newBoardLeft)) {
        boardChangedLeft = true;
      }
      return {
        ...state,
        board: newBoardLeft,
        tiles: {
          ...state.tiles,
          ...newTilesLeft, // Merge newTiles with existing tiles
        },
        boardChanged: boardChangedLeft,
        hasChanged: newHasChangedLeft,
        score,
      };
    case "move_right":
      const newBoardRight = createBoard();
      const newTilesRight: { [id: string]: TileSettings } = {};
      const newHasChangedRight = new Set<string>();
      for (let col = 0; col < 4; col++) {
        let new_row = 3; // Initialize new_col inside the row loop
        for (let row = 3; row > -1; row--) {
          const currID = state.board[row][col];
          if (currID !== "0") {
            // Check if a tile exists on this position
            if (
              new_row < 3 &&
              state.tiles[newBoardRight[new_row + 1][col]].value ==
                state.tiles[currID].value &&
              !newHasChangedRight.has(newBoardRight[new_row + 1][col])
            ) {
              new_row = new_row + 1;
              newHasChangedRight.add(currID);
              newTilesRight[currID] = {
                value: state.tiles[currID].value * 2,
                xcoordinate: new_row,
                ycoordinate: col,
                hasChanged: true,
                justSpawned: false
              };
              score += state.tiles[currID].value * 2;
            } else {
              newTilesRight[currID] = {
                value: state.tiles[currID].value,
                xcoordinate: new_row,
                ycoordinate: col,
                hasChanged: false,
                justSpawned: false
              };
            }

            newBoardRight[new_row][col] = currID;
            new_row--;
          }
        }
      }
      let boardChangedRight = false;
      if (!boardsEqual(state.board, newBoardRight)) {
        boardChangedRight = true;
      }

      return {
        ...state,
        board: newBoardRight,
        tiles: {
          ...state.tiles,
          ...newTilesRight, // Merge newTiles with existing tiles
        },
        boardChanged: boardChangedRight,
        hasChanged: newHasChangedRight,
        score,
      };

    case "move_up":
      let newScoreUp = state.score;
      const newBoardUp = createBoard();
      const newTilesUp: { [id: string]: TileSettings } = {};
      const newHasChangedUp = new Set<string>();
      for (let row = 0; row < 4; row++) {
        let new_col = 0; // Initialize new_col inside the row loop
        for (let col = 0; col < 4; col++) {
          const currID = state.board[row][col];
          if (currID !== "0") {
            // Check if a tile exists on this position
            if (
              new_col > 0 &&
              state.tiles[newBoardUp[row][new_col - 1]].value ==
                state.tiles[currID].value &&
              !newHasChangedUp.has(newBoardUp[row][new_col - 1])
            ) {
              new_col = new_col - 1;
              newHasChangedUp.add(currID);
              newTilesUp[currID] = {
                value: state.tiles[currID].value * 2,
                xcoordinate: row,
                ycoordinate: new_col,
                hasChanged: true,
                justSpawned: false
              };
              score += state.tiles[currID].value * 2;
            } else {
              newTilesUp[currID] = {
                value: state.tiles[currID].value,
                xcoordinate: row,
                ycoordinate: new_col,
                hasChanged: false,
                justSpawned: false
              };
            }

            newBoardUp[row][new_col] = currID;
            new_col++;
          }
        }
      }
      let boardChangedUp = false;
      if (!boardsEqual(state.board, newBoardUp)) {
        boardChangedUp = true;
      }

      return {
        ...state,
        board: newBoardUp,
        tiles: {
          ...state.tiles,
          ...newTilesUp, // Merge newTiles with existing tiles
        },
        boardChanged: boardChangedUp,
        hasChanged: newHasChangedUp,
        score,
      };

    case "move_down":
      let newScoreDown = state.score;
      const newBoardDown = createBoard();
      const newTilesDown: { [id: string]: TileSettings } = {};
      const newHasChangedDown = new Set<string>();
      for (let row = 0; row < 4; row++) {
        let new_col = 3; // Initialize new_col inside the row loop
        for (let col = 3; col > -1; col--) {
          const currID = state.board[row][col];
          if (currID !== "0") {
            // Check if a tile exists on this position
            if (
              new_col < 3 &&
              state.tiles[newBoardDown[row][new_col + 1]].value ==
                state.tiles[currID].value &&
              !newHasChangedDown.has(newBoardDown[row][new_col + 1])
            ) {
              new_col = new_col + 1;
              newHasChangedDown.add(currID);
              newTilesDown[currID] = {
                value: state.tiles[currID].value * 2,
                xcoordinate: row,
                ycoordinate: new_col,
                hasChanged: true,
                justSpawned: false
              };
              score += state.tiles[currID].value * 2;
            } else {
              newTilesDown[currID] = {
                value: state.tiles[currID].value,
                xcoordinate: row,
                ycoordinate: new_col,
                hasChanged: false,
                justSpawned: false
              };
            }

            newBoardDown[row][new_col] = currID;
            new_col--;
          }
        }
      }
      let boardChangedDown = false;
      if (!boardsEqual(state.board, newBoardDown)) {
        boardChangedDown = true;
      }

      return {
        ...state,
        board: newBoardDown,
        tiles: {
          ...state.tiles,
          ...newTilesDown, // Merge newTiles with existing tiles
        },
        boardChanged: boardChangedDown,
        hasChanged: newHasChangedDown,
        score,
      };
      case "reset_game":
        let row1, col1, row2, col2;
      
        // Generate random coordinates for the first tile
        row1 = Math.floor(Math.random() * 4);
        col1 = Math.floor(Math.random() * 4);
        
        // Generate random coordinates for the second tile, ensuring they are different
        do {
          row2 = Math.floor(Math.random() * 4);
          col2 = Math.floor(Math.random() * 4);
        } while (row1 === row2 && col1 === col2);
      
        // get the value
        const randomNumber = Math.random();
        const randomNumber2 = Math.random()
        let value1: number;
        let value2: number;

        if (randomNumber < 0.8) {
            value1 = 2; // 70% chance of being 2
        } else {
            value1 = 4; // 30% chance of being 4
        }

        if (randomNumber2 < 0.8) {
          value2 = 2; // 70% chance of being 2
        } else {
          value2 = 4; // 30% chance of being 4
        }
      
        const tile1: TileSettings = { 
          value: value1, 
          xcoordinate: row1, 
          ycoordinate: col1, 
          justSpawned: true, 
          hasChanged: false
        };
      
        const tile2: TileSettings = { 
          value: value2, 
          xcoordinate: row2, 
          ycoordinate: col2, 
          justSpawned: true, 
          hasChanged: false
        };
        
        const resetBoard = JSON.parse(JSON.stringify(initialState.board));
        const resetTileID1 = uid();
        const resetTileID2 = uid();
        resetBoard[row1][col1] = resetTileID1;
        resetBoard[row2][col2] = resetTileID2;
      
        return {
          ...initialState,
          board: resetBoard,
          tiles: {
            ...initialState.tiles,
            [resetTileID1]: tile1,
            [resetTileID2]: tile2,
          },
        };
    default:
      return state;
  }
}