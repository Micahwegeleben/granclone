import React, { useState } from 'react';
import Button from '@mui/material/Button';
import BattleField from './components/BattleField';
import GameStateContext from './components/GameStateContext';
import initialPlayerTeam from './data/playerCharacters';
import initialEnemyTeam from './data/enemyCharacters';

function App() {
	const [playerTeam, setPlayerTeam] = useState(initialPlayerTeam);
	const [enemyTeam, setEnemyTeam] = useState(initialEnemyTeam);
	const [attackLog, setAttackLog] = useState([]);
	const [currentTurn, setCurrentTurn] = useState(1);
	const [selectedTarget, setSelectedTarget] = useState(0);
	const [gameState, setGameState] = useState('start');
	const [hoveredSkill, setHoveredSkill] = useState(playerTeam[0].skills[0]);
	const [showDescriptions, setShowDescriptions] = useState(false);

	const initialize = () => {
		setPlayerTeam(...initialPlayerTeam);
		setEnemyTeam(...initialEnemyTeam);
		setAttackLog([]);
		setCurrentTurn(1);
		setSelectedTarget(0);
		setGameState('start');
		setHoveredSkill(playerTeam[0].skills[0]);
		setShowDescriptions(false);
		//wip
		window.location.reload();
	};
	return (
		<GameStateContext.Provider
			value={{
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
			}}
		>
			<div>
				{
					//if is playing then render battlefield
					gameState === 'playing' ? (
						<BattleField />
					) : gameState === 'start' ? (
						<Button
							variant="contained"
							onClick={() => setGameState('playing')}
							style={{ margin: 'auto', display: 'block', marginTop: '20px' }}
						>
							Start Game
						</Button>
					) : (
						<BattleField />
					)
				}
			</div>
		</GameStateContext.Provider>
	);
}

export default App;
