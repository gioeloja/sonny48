'use client'
import React from "react";
import GameBoard from "./gameBoard";
import { Board } from "./Board";

function LosePopup({ handleNewGame }) {
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
          onClick={handleNewGame}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [board, setBoard] = React.useState(new Board());
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(() => {
    // Retrieve best score from localStorage or default to 0
    const storedBestScore = localStorage.getItem("bestScore");
    return storedBestScore ? parseInt(storedBestScore, 10) : 0;
  });
  const [prevBoard, setPrevBoard] = React.useState(new Board());
  const [isLost, setIsLost] = React.useState(false);
  const [showNumbers, setShowNumbers] = React.useState(false); // State variable to track showNumbers

  React.useEffect(() => {
    const newBoard = new Board();
    newBoard.generateNewTile();
    newBoard.generateNewTile();
    setBoard(newBoard);
    setPrevBoard(newBoard.clone()); // Initialize prevBoard

    const handleKeyPress = (event) => {
      setBoard((prevBoard) => {
        const newBoard = prevBoard.clone();
        switch (event.key) {
          case "ArrowUp":
          case "w":
            newBoard.moveTiles("up");
            break;
          case "ArrowDown":
          case "s":
            newBoard.moveTiles("down");
            break;
          case "ArrowRight":
          case "d":
            newBoard.moveTiles("right");
            break;
          case "ArrowLeft":
          case "a":
            newBoard.moveTiles("left");
            break;
        }
        

        if (newBoard.checkLoss()) {
          setIsLost(true);
        }

        const newScore = newBoard.getScore();
        setScore(newScore);

        // Update prevBoard
        setPrevBoard(prevBoard.clone());

        return newBoard;
      });
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  React.useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);

      localStorage.setItem("bestScore", score.toString());
    }
  }, [score, bestScore]);

  const handleNewGame = () => {
    const newBoard = new Board();
    newBoard.generateNewTile();
    newBoard.generateNewTile();
    setScore(0);
    setBoard(newBoard);
    setPrevBoard(newBoard.clone()); 
    setIsLost(false); 
  };

  return (
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
            <button className="bg-[#8b6d61] text-white font-bold py-2 px-4 rounded-lg" onClick={handleNewGame}>
              New Game
            </button>
          </div>
        </div>
        <div className="w-full h-[500px] relative">
          <GameBoard board={board} prevBoard={prevBoard} showNumbers={showNumbers} />
          {isLost && <LosePopup handleNewGame={handleNewGame} />}
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
  );
}
