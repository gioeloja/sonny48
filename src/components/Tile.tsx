import { useState, useEffect } from "react";

interface TileProps {
    value: number;
    showNumber: boolean;
    xcoordinate: number;
    ycoordinate: number;
    hasChanged: boolean;
    justSpawned: boolean;
  }
  
  export const Tile: React.FC<TileProps> = ({ value, showNumber, xcoordinate, ycoordinate, hasChanged = false, justSpawned = false }) => {
    const [scale, setScale] = useState(1);

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
    
    const style = {
      backgroundColor: colorMap[value],
      left: `${59.5 * 2 * xcoordinate}px`, 
      top: `${60.5 * 2 * ycoordinate}px`, 
      color: value > 4 ? 'white' : '#776e65',
      transform: `scale(${scale})`,
      transitionProperty: 'left, top, transform',
      transitionDuration: justSpawned ? '0.2s, 0.2s, 0.15s' : '0.15s, 0.15s, 0.1s',
      zIndex: hasChanged ? 10 : 1,
    };

    useEffect(() => {
      if (hasChanged) {
        setScale(1.2);
        setTimeout(() => setScale(1), 100);
      }
    }, [hasChanged]);

    useEffect(() => {
      if (justSpawned) {
          setScale(0); // Set initial scale to 0
          setTimeout(() => setScale(1), 150); // Gradually increase scale to 1
      }
  }, [justSpawned]);
  
  
    return (
    <div
        className="w-full h-full bg-[#e0b09c] relative font-bold text-[42px] rounded-md p-2 flex items-center justify-center tile transform scale-100 ease-in-out"
        style={style}
    >
        {showNumber ? value : <img src={imageMap[value]} />}
    </div>
    );
  };