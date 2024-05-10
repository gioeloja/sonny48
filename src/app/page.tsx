'use client'
import React, {useContext} from "react";
import GameBoard from "../components/GameBoard";
import GameProvider from "../interface/interface";
import { GameContext } from "../interface/interface";
import NewGameButton from "./NewGameButton";
import LosePopup from "./LosePopup";
import Score from "./score";


export default function Home() {
  const { score, resetGame, start } = useContext(GameContext);
  const [isLost, setIsLost] = React.useState(false);
  const [showNumbers, setShowNumbers] = React.useState(false); // State variable to track showNumbers

  return (
    <GameProvider>
      <main className="flex justify-center h-screen bg-[#ffd5e9]">
        <div className="w-[620px] pt-4 p-16 relative">
          <div className="flex font-bold text-[#946656] text-[64px] font-sans">sonny48</div>
          <div className="h-[150px] flex items-center justify-between">
            <div className="flex w-3/4 h-[60px]">
              <Score/>
            </div>
            <div className="w-1/4">
              <NewGameButton/>
            </div>
          </div>
          <div className="w-full h-[500px] relative">

              <GameBoard showNumbers={showNumbers} />


              <LosePopup/>
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
