import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import './BattleField.css';
import './RenderCards.css';
import { useGameState } from './GameStateContext';

const RenderTeam = ({ character, handleSelectTargetButton }) => {
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
	} = useGameState();
	return (
		<div className="character-container">
			<div className="card-left">
				<img src={character.img} alt="example" className="icon" />
				{character.health > 0 && (
					<Button
						className="select-target-button"
						variant="contained"
						onClick={handleSelectTargetButton(character.id)}
						//if selected id = character.id then turn button red
						style={{ backgroundColor: selectedTarget === character.id ? 'maroon' : 'gray', padding: '5px' }}
					>
						Select Target
					</Button>
				)}
			</div>
			<div
				key={character.id}
				className={`character-card ${character.health <= 0 ? 'dead' : ''}`}
				style={{
					border: selectedTarget === character.id ? '3px solid maroon' : '3px solid #4788a4',
				}}
			>
				<p className="name">
					{character.name}
					{character.health <= 0 ? ' (Dead)' : ''}
				</p>
				<p className="name">{character.title}</p>
				<p>
					Health: {character.health}/{character.maxHealth}
				</p>
				<LinearProgress
					variant="determinate"
					value={(character.health / character.maxHealth) * 100}
					style={{
						backgroundColor: 'red',
						transition: 'background-color 0.5s ease', // Add a transition for a smoother
						borderRadius: '50px', // Optional: add rounded corners
						boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', // Optional: add a subtle shadow
						height: '12px',
                                                //create a logarithmic equation that will be used for the width of the healthbar, scaling with the maxHealth of the character. at 500 maxHealth, the width should be 25%, while at 1 million maxHealth it should be 100%
                                                width: `${30 + (75 * Math.log10(character.maxHealth / 500)) / 3.25}%`,
                                        }}
                                        color="success"
                                />
				<p>
					{character.diamonds === 0
						? '◇◇◇'
						: character.diamonds === 1
						? '◆◇◇'
						: character.diamonds === 2
						? '◆◆◇'
						: '◆◆◆ Special incoming!'}
				</p>
				<p>Attack: {character.attack}</p>
				<p>Armor: {character.armor}</p>
			</div>
		</div>
	);
};

export default RenderTeam;
