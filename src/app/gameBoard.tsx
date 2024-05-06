import React, { useState, useEffect } from 'react';
import { Board } from './Board'; 


interface GameBoardProps {
  board: Board;
  prevBoard: Board;
  showNumbers: boolean;
}

export default function GameBoard({ board, prevBoard, showNumbers }: GameBoardProps) {
  const [boardValues, setBoardValues] = useState(board.getBoard());

  useEffect(() => {
    // Update board values when the board prop changes
    setBoardValues(board.getBoard());
  }, [board]);

  // Specify types for colorMap and imageMap
  const colorMap: { [key: number]: string } = {
    2: '#fce4ec',
    4: '#f8bbd0',
    8: '#f48fb1',
    16: '#f06292',
    32: '#ec407a',
    64: '#e91e63',
    128: '#d81b60',
    256: '#c2185b',
    512: '#ad1457',
    1024: '#880e4f',
    2048: '#6a1b9a',
    4096: '#9c27b0',
    8192: '#ab47bc',
    16384: '#ba68c8',
    32768: '#ce93d8',
    65536: '#e1bee7',
  };

  const imageMap: { [key: number]: string } = {
    2: 'sonny_flower.png',
    4: 'sonny_konpeito.png',
    8: 'sonny_star.png',
    16: 'sonny_bunny.png',
    32: 'sonny_shortcake.png',
    64: 'sonny_strawberry.png',
    128: 'sonny_shark.png',
    256: 'sonny_fawn.png',
    512: 'sonny_hybrangea.png',
    1024: 'sonny_pancakes.png',
    2048: 'sonny_chef.png',
    4096: 'sonny_calico.png',
    8192: 'sonny_siamese.png',
    16384: 'sonny_seoul.png',
    32768: 'sonny_taxi.png',
    65536: 'sonny_clown.png',
  };

  return (
    <main className="w-full h-full bg-[#c79273] rounded-lg grid grid-cols-4 gap-4 p-4">
      {boardValues.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="bg-[#e0b09c] font-bold text-[42px] rounded-md p-2 flex items-center justify-center"
            style={{
              backgroundColor: colorMap[cell],
              color: cell > 4 ? 'white' : '#776e65',
              transition: 'background-color 0.3s ease-in-out',
            }}
          >
            {/* Conditionally render either the number or the image */}
            {showNumbers ? (cell !== 0 ? cell : '\u00A0') : (cell !== 0 ? <img src={imageMap[cell]} alt={cell.toString()} /> : <img src="empty.png" alt="Empty" />)}
          </div>
        ))
      ))}
    </main>
  );
}
