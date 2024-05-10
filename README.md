# [sonny48](https://sonny48.vercel.app/)

sonny48 is a 2048 clone made for my girlfriend. This was built using React, Tailwind CSS, TypeScript. 

## Design

The GameBoard component in ```/src/components/GameBoard.tsx``` renders the 2048 grid. Tile components (```/src/components/Tile.tsx```) are placed on this grid. The game reducer found in ```/src/reducer/reducer.tsx``` manages the state of the GameBoard and Tile components. Here, actions like creating tiles, moving tiles, resetting the game, etc., are defined. The game context found in ```/src/interface/interface.tsx``` serves as an interface for interacting with the game reducer.
