import React, { useContext } from "react";
import { GameContext } from "../interface/interface";

const NewGameButton = () => {
  const { resetGame, start } = useContext(GameContext);

  const handleNewGameClick = () => {
    resetGame();
    start();
    start();
  };

  return (
    <button
        onClickCapture={handleNewGameClick}
        className="bg-[#8b6d61] text-white font-bold py-2 px-4 rounded-lg"
    >
      New Game
    </button>
  );
};

export default NewGameButton;
