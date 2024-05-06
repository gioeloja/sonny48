import React from 'react';

export default function GameBoard({ board }) {
  const boardValues = board.getBoard();

  // Define a mapping between cell values and their corresponding colors
  const colorMap = {
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
    
    // Add more values and colors as needed
  };

  return (
    <main className="w-full h-full bg-[#c79273] rounded-lg grid grid-cols-4 gap-4 p-4">
      {boardValues.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="bg-[#e0b09c] font-bold text-[42px] rounded-md p-2 flex items-center justify-center"
            style={{ backgroundColor: colorMap[cell], color: cell > 4 ? 'white' : '#776e65' }}
          >
            {cell !== 0 ? cell : '\u00A0'}
          </div>
        ))
      ))}
    </main>
  );
}
