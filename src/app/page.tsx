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
    newBoard.generateNewTile();
    
    setBoard(newBoard);
  }, []);

  return (
    <main className="flex justify-center h-screen bg-gray-200">
      <div className="w-1/3 p-16 text-white bg-gray-100">
        <div className="flex font-semibold text-[64px] justify-center">sonny48</div>
        <div className="h-[100px]"></div>
        <div className="w-[500x] h-[500px]">
          <GameBoard board={board} />
        </div>
      </div>
    </main>
  );
}
