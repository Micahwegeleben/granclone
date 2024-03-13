import { createContext, useContext } from 'react';

const GameStateContext = createContext();

export const useGameState = () => useContext(GameStateContext);

export default GameStateContext;
