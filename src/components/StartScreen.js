//construct the barebones

import React from 'react';
import Button from '@mui/material/Button';
import { useGameState } from './GameStateContext';
import './StartScreen.css';

const StartScreen = () => {
	const {
		playerTeam,
		setPlayerTeam,
		enemyTeam,
		setEnemyTeam,
		attackLog,
		setAttackLog,
		currentTurn,
		setCurrentTurn,
		selectedTarget,
		setSelectedTarget,
		gameState,
		setGameState,
		hoveredSkill,
		setHoveredSkill,
		showDescriptions,
		setShowDescriptions,
		holdCharge,
		setHoldCharge,
	} = useGameState();
	return (
		<div className="startscreen">
			<h1>Start Menu</h1>
			<Button variant="contained" onClick={() => setGameState('playing')}>
				Begin Game
			</Button>
			<h2 className="start">Notes:</h2>
			<ul>
				<li>
					Mana is my extra addition to the game. It is a secondary resource that can determine if you win or lose
					the game. It is much more volatile than health, but typically cannot be used to your detriment by the
					enemy.
				</li>
			</ul>
		</div>
	);
};

export default StartScreen;
