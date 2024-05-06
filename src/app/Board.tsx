export class Board {
  private board: number[][];

  constructor() {
    // initialize board
    this.board = Array.from({ length: 4 }, () => Array(4).fill(0));
  }

  generateNewTile(): void {
    const emptyPositions: { row: number, col: number }[] = [];
    this.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          emptyPositions.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (emptyPositions.length > 0) {
      const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
      this.board[randomPosition.row][randomPosition.col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  mergeArray(arr: number[]): number[] {
    for (let i = 0; i < arr.length - 1; i++) {
        let adjacent_i = i + 1;

        while (adjacent_i <= arr.length - 1) {
            if (arr[i] === arr[adjacent_i]) {
                arr[adjacent_i] = 0;
                arr[i] *= 2;
                break;
            } else if (arr[adjacent_i] === 0) {
                adjacent_i += 1;
            } else if (arr[adjacent_i] !== 0 && arr[adjacent_i] !== arr[i]) {
                break;
            }
        }
    }

    // Filter out zeros to shift non-zero tiles upwards
    arr = arr.filter(tile => tile !== 0);

    // Add zeros to the end of the array
    while (arr.length < 4) {
        arr.push(0);
    }

    return arr;
}

moveTiles(direction: string): void {
  let moved = false;
  switch (direction) {
      case "up":
          for (let col = 0; col < 4; col++) {
              var curr_col = [this.board[0][col], this.board[1][col], this.board[2][col], this.board[3][col]];
              const new_col = this.mergeArray(curr_col);

              if (!this.arraysEqual(this.board.map(row => row[col]), new_col)) {
                moved = true;
              }

              this.board[0][col] = new_col[0];
              this.board[1][col] = new_col[1];
              this.board[2][col] = new_col[2];
              this.board[3][col] = new_col[3];
          }
          break;
      case "down":
          for (let col = 0; col < 4; col++) {
              var curr_col = [this.board[3][col], this.board[2][col], this.board[1][col], this.board[0][col]];
              const new_col = this.mergeArray(curr_col);

              if (!this.arraysEqual(this.board.map(row => row[col]), new_col)) {
                moved = true;
              }

              this.board[3][col] = new_col[0];
              this.board[2][col] = new_col[1];
              this.board[1][col] = new_col[2];
              this.board[0][col] = new_col[3];
          }
          break;
      case "left":
        for (let row = 0; row < 4; row++) {
            var curr_row = this.board[row];
            const new_row = this.mergeArray(curr_row);
    
            if (!this.arraysEqual(this.board[row], new_row)) {
                moved = true;
            }
    
            this.board[row] = new_row;
        }
        break;
      case "right":
        for (let row = 0; row < 4; row++) {
            var curr_row = this.board[row];
            const reversed_row = curr_row.slice().reverse(); // Create a copy of the row before reversing
            const new_row = this.mergeArray(reversed_row).reverse();
    
            if (!this.arraysEqual(this.board[row], new_row)) {
                moved = true;
            }
    
            this.board[row] = new_row;
        }
        break;
    }

    if (moved) {
      this.generateNewTile();
    }
  }

  getBoard(): number[][] {
    return this.board;
  }

  arraysEqual(arr1: number[], arr2: number[]): boolean {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  
  boardsEqual(otherBoard: Board): boolean {
    return JSON.stringify(this.board) === JSON.stringify(otherBoard.board);
  }

  clone(): Board {
    const clonedBoard = new Board();
    // Deep copy the board array
    clonedBoard.board = this.board.map(row => [...row]);
    return clonedBoard;
  } 

  checkLoss(): boolean {
    const moves = ["up", "down", "left", "right"];
    for (const move of moves) {
        const clonedBoard = this.clone();
        clonedBoard.moveTiles(move);
        if (!this.boardsEqual(clonedBoard)) {
            return false;
        }
    }
    
    return true;
  }
}