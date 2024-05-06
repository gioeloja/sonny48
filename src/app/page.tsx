'use client'

import React from "react";
import Image from "next/image";
import GameBoard from "./gameBoard";
import { Board } from "./Board";

export default function Home() {
  const [board, setBoard] = React.useState(new Board());

  React.useEffect(() => {
    const newBoard = new Board();
    newBoard.generateNewTile();
    newBoard.generateNewTile();
    
    setBoard(newBoard);

    const handleKeyPress = (event) => {
      setBoard(prevBoard => {
        const newBoard = prevBoard.clone();
        switch (event.key) {
          case 'ArrowUp':
            newBoard.moveTiles("up");
            break;
          case 'ArrowDown':
            newBoard.moveTiles("down");
            break;
          case 'ArrowRight':
            newBoard.moveTiles("right");
            break;
          case 'ArrowLeft':
            newBoard.moveTiles("left");
            break;
        }

        if (newBoard.checkLoss()) {
          // Game over logic (e.g., display game over message)
          console.log("Game over!");
        }
        
        return newBoard;
      });
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <main className="flex justify-center h-screen bg-[#ffd5e9]">
      <div className="w-[620px] pt-4 p-16">
        <div className="flex font-bold text-[#946656] text-[64px] font-sans">sonny48</div>
        <div className="h-[150px] flex items-center justify-between">
          <div className="flex w-3/4 h-[60px]">
            <div className="flex flex-col w-1/4 items-center justify-center mr-2 rounded-lg bg-[#e0b09c]">
              <div className="text-sm text-[#946656] font-semibold">SCORE</div>
              <div className="font-bold text-white text-lg">0</div> 
            </div>
            <div className="flex flex-col w-1/3 items-center justify-center rounded-lg bg-[#e0b09c]">
              <div className="text-sm text-[#946656] font-semibold">BEST</div>
              <div className="font-bold text-white text-lg">0</div> 
            </div>
          </div>
          <div className="w-1/4">
            <button className="bg-[#8b6d61] text-white font-bold py-2 px-4 rounded-lg">
              New Game
            </button>
          </div>
        </div>
        <div className="w-full h-[500px]">
          <GameBoard board={board} />
        </div>
      </div>
    </main>
  );
}
