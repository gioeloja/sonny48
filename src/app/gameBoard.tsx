import React from 'react';

export default function GameBoard({ board }) {
  const boardValues = board.getBoard()
  return (
    <main className="w-full h-full bg-pink-500 rounded-lg grid grid-cols-4 gap-4 p-4">
      {boardValues.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="bg-white text-black rounded-sm p-2 flex items-center justify-center">
            {cell}
          </div>
        ))
      ))}
    </main>
  );
}
