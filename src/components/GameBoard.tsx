import React, { useState, useEffect, useContext } from 'react';
import { Tile } from './Tile';
import { GameContext } from '../interface/interface';
import { TileSettings } from '../reducer/reducer';

interface GameBoardProps {
  showNumbers: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ showNumbers }) => {
  const { getTiles, moveTiles, generateRandomTile, start, score, resetGame } = useContext(GameContext);
  
  useEffect(() => {
    start();
    start();

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          moveTiles('left');
          break;
        case 'ArrowRight':
          moveTiles('right');
          break;
        case 'ArrowUp':
          moveTiles('up');
          break;
        case 'ArrowDown':
          moveTiles('down');
          break;
        default:
          break;
      }
    };

    // Add event listener for key presses
    window.addEventListener('keydown', handleKeyPress);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className='w-full h-full'>
      <div className="w-full h-full bg-[#c79273] rounded-lg grid grid-cols-4 gap-4 p-4">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-[100px] h-[100px] flex items-center bg-[#e0b09c] rounded-md justify-center"></div>
        ))}
      {Object.entries(getTiles()).map(([key, tile]) => (
        <div key={key} className="w-[100px] h-[100px] absolute flex items-center rounded-md justify-center">
          <Tile
            key={key}
            showNumber={showNumbers}
            {...(tile as TileSettings)} // Cast tile to TileSettings
          />
        </div>
      ))}
      </div>
    </div>
  );
}


export default GameBoard;