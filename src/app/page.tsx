'use client'
import React, {useContext} from "react";
import GameBoard from "./components/GameBoard";
import GameProvider from "./interface/interface";
import { GameContext } from "./interface/interface";

interface LosePopupProps {
  handleNewGame: () => void;
}

function LosePopup() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Delay the setting of isVisible to trigger the fade-in effect
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-70`} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 2s ease-in-out' }}>
      <div className="p-8 rounded-lg text-center">
        <h2 className="text-[64px] font-bold text-[#946656] mb-4">Game over!</h2>
        <button
          className="bg-[#8b6d61] text-white font-bold py-2 px-4 rounded-lg"

        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const { score, resetGame, start } = useContext(GameContext);
  const [bestScore, setBestScore] = React.useState(() => {
    // Retrieve best score from localStorage or default to 0 if localStorage is not available
    if (typeof window !== 'undefined') {
      const storedBestScore = localStorage.getItem("bestScore");
      return storedBestScore ? parseInt(storedBestScore, 10) : 0;
    }
    return 0;
  });
  const [isLost, setIsLost] = React.useState(false);
  const [showNumbers, setShowNumbers] = React.useState(false); // State variable to track showNumbers

  React.useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);

      // Update localStorage if it's available
      if (typeof window !== 'undefined') {
        localStorage.setItem("bestScore", score.toString());
      }
    }
  }, [score, bestScore]);

  const handleNewGame: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("test")
    resetGame();
  };

  return (
    <GameProvider>
      <main className="flex justify-center h-screen bg-[#ffd5e9]">
        <div className="w-[620px] pt-4 p-16 relative">
          <div className="flex font-bold text-[#946656] text-[64px] font-sans">sonny48</div>
          <div className="h-[150px] flex items-center justify-between">
            <div className="flex w-3/4 h-[60px]">
              <div className="flex flex-col w-1/4 items-center justify-center mr-2 rounded-lg bg-[#e0b09c]">
                <div className="text-sm text-[#946656] font-semibold">SCORE</div>
                <div className="font-bold text-white text-lg">{score}</div>
              </div>
              <div className="flex flex-col w-1/3 items-center justify-center rounded-lg bg-[#e0b09c]">
                <div className="text-sm text-[#946656] font-semibold">BEST</div>
                <div className="font-bold text-white text-lg">{bestScore}</div>
              </div>
            </div>
            <div className="w-1/4">
              <button className="bg-[#8b6d61] text-white font-bold py-2 px-4 rounded-lg" >
                New Game
              </button>
            </div>
          </div>
          <div className="w-full h-[500px] relative">

              <GameBoard showNumbers={showNumbers} />


            {isLost && <LosePopup/>}
          </div>
          <div className="flex items-center mt-6 gap-1">
            <label className="text-[#946656] text-[18px] font-semibold mr-2">Show Numbers:</label>
            <input
              type="checkbox"
              id="showNumbers"
              checked={showNumbers}
              onChange={() => setShowNumbers(!showNumbers)}
              className="h-6 w-6 rounded border-2 border-[#8b6d61] focus:outline-none"
            />
          </div>
        </div>
      </main>
    </GameProvider>
  );
}
