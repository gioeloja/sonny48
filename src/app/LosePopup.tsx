import React, { useContext, useState } from "react";
import { GameContext } from "@/interface/interface";

const LosePopup: React.FC = () => {
    const { resetGame, start } = useContext(GameContext);

    const [isVisible, setIsVisible] = useState(false);

    const handleTryAgain = () => {
        resetGame();
        start()
        start()
    };

    // Apply conditional style for opacity
    const popupStyle = {
        opacity: isVisible ? 1 : 0,
        transition: isVisible ? 'opacity 2s ease-in-out' : 'none', // Add transition only when isVisible is true
    };

    return (
        <div className={`absolute top-0 left-0 w-full h-full flex z-10 items-center justify-center bg-gray-300 bg-opacity-70`} style={popupStyle}>
            <div className="p-8 rounded-lg text-center">
                <h2 className="text-[64px] font-bold text-[#946656] mb-4">Game over!</h2>
                <button
                    className="bg-[#8b6d61] text-white font-bold py-2 px-4 rounded-lg"
                    onClickCapture={handleTryAgain}
                >
                    Try again
                </button>
            </div>
        </div>
    );
};

export default LosePopup;
