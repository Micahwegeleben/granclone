import React, { useState } from 'react';
import './BattleField.css';
import Button from '@mui/material/Button';
import RenderPlayerTeam from './RenderPlayerTeam';
import RenderEnemyTeam from './RenderEnemyTeam';
import { useGameState } from './GameStateContext';
import { calcDamage, determineTarget, handleDamage, checkWin, battleLog } from './utils';

const BattleFieldRender = ({ globalAttack }) => {
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

	const handleReloadButton = () => {
		window.location.reload();
	};
	const handleSelectTargetButton = id => {
		return () => {
			//if selected target has 0 hp, unselect them
			if (selectedTarget === id) {
				setSelectedTarget(0);
			} else {
				setSelectedTarget(id);
			}
			if (enemyTeam.find(target => target.id === id).health <= 0) {
				setSelectedTarget(0);
			}
		};
	};

	const handleAttackButton = () => {
		globalAttack(enemyTeam, setEnemyTeam, playerTeam);
		globalAttack(playerTeam, setPlayerTeam, enemyTeam);
	};

	return (
		<div>
			<h1>Granblue Clone</h1>
			<div className="teams-wrapper">
				<div className="team-container">
					<h2>Player Team</h2>
					{playerTeam.map(character => (
						<RenderPlayerTeam character={character} />
					))}
				</div>
				<div>
					<Button
						variant="contained"
						onClick={handleAttackButton}
						size="large"
						style={{
							backgroundColor: '#f17c0a',
							borderRadius: '30px',
							width: '180px',
							height: '70px',
							margin: '4px',
							marginBottom: '0px',
							padding: '0px',
							minWidth: '50px',
							position: 'relative',
							border: '6px inset #c76c03',
							left: '30%',
						}}
					>
						Attack
					</Button>
					<div className="container">
						{hoveredSkill.name}
						<br />
						<br />
						Cooldown: {hoveredSkill.maxCooldown}
						<br />
						<br />
						{hoveredSkill.description}
					</div>
					<div className="container">
						<Button
							onClick={() => {
								setShowDescriptions(!showDescriptions);
							}}
						>
							Toggle Descriptions
						</Button>
						{playerTeam.map(character => {
							return (
								<div>
									{character.name}
									<br />
									{character.buffs.map(buff => {
										return (
											<div>
												{buff.name}
												<p1> - </p1>
												{buff.remainingDuration}
												<p1> turns remaining</p1>
												{showDescriptions ? <p1> - {buff.description}</p1> : null}
											</div>
										);
									})}
									<br />
								</div>
							);
						})}
					</div>
					<div className="container">
						{enemyTeam.map(character => {
							return (
								<div>
									{character.name}
									<br />
									{character.buffs.map(buff => {
										return (
											<div>
												{buff.name}
												<p1> - </p1>
												{buff.remainingDuration}
												<p1> turns remaining</p1>
												{showDescriptions ? <p1> - {buff.description}</p1> : null}
											</div>
										);
									})}
									<br />
								</div>
							);
						})}
					</div>
				</div>

				<div className="team-container">
					<h2>Enemy Team</h2>
					{enemyTeam.map(character => (
						<RenderEnemyTeam character={character} handleSelectTargetButton={handleSelectTargetButton} />
					))}
				</div>
			</div>
			<button onClick={handleReloadButton}>New Game</button>

			<div className="attack-log">
				<h2>Attack Log</h2>
				<ul>
					{attackLog.map((log, index) => (
						<li key={index}>
							{`Turn ${log.turn}: ${log.attacker} attacked ${log.defender} for ${log.damage} damage, leaving them at ${log.remainingHealth}`}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BattleFieldRender;
