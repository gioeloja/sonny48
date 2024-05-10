import React, { useContext, useEffect } from "react";
import { GameContext } from "../interface/interface";

const Score: React.FC = () => {
  const { score } = useContext(GameContext);

  // Retrieve best score from localStorage or default to 0 if localStorage is not available
  const storedBestScore = typeof window !== 'undefined' ? localStorage.getItem("bestScore") : null;
  const bestScore = storedBestScore ? parseInt(storedBestScore, 10) : 0;

  // Update localStorage if current score exceeds best score
  useEffect(() => {
    if (score > bestScore) {
      localStorage.setItem("bestScore", score.toString());
    }
  }, [score, bestScore]);

  return (
    <React.Fragment>
      <div className="flex flex-col w-1/4 items-center justify-center mr-2 rounded-lg bg-[#e0b09c]">
        <div className="text-sm text-[#946656] font-semibold">SCORE</div>
        <div className="font-bold text-white text-lg">{score}</div>
      </div>
      <div className="flex flex-col w-1/3 items-center justify-center rounded-lg bg-[#e0b09c]">
        <div className="text-sm text-[#946656] font-semibold">BEST</div>
        <div className="font-bold text-white text-lg">{bestScore}</div>
      </div>
    </React.Fragment>
  );
};

export default Score;
