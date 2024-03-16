import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './BattleField.css';
import Button from '@mui/material/Button';
import RenderPlayerTeam from './RenderPlayerTeam';
import RenderEnemyTeam from './RenderEnemyTeam';
import { useGameState } from './GameStateContext';
import { calcDamage, determineTarget, handleDamage, checkWin, battleLog } from './utils';
import './GameOverScreen.css';

const GameOverScreen = ({ onRestart, victory }) => {
	return (
		<div className="gameover-overlay">
			<div className="gameover-content">
				{victory ? <p>You win!</p> : <p>You lose!</p>}
				<button onClick={onRestart}>Restart</button>
			</div>
		</div>
	);
};

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
		holdCharge,
		setHoldCharge,
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

	const handleRestart = () => {
		window.location.reload();
	};

	const handleToggleHoldChargeAttack = () => {
		setHoldCharge(!holdCharge);
	};
	return (
		<div>
			<h1>Granblue Clone</h1>
			{gameState === 'win' && <GameOverScreen onRestart={handleRestart} victory={true} />}
			{gameState === 'loss' && <GameOverScreen onRestart={handleRestart} victory={false} />}
			{gameState === 'win' || ('loss' && <div className="freeze-layer" />)}
			<div className="teams-wrapper">
				<div className="team-container">
					<FormGroup>
						<FormControlLabel
							control={<Checkbox checked={holdCharge} onChange={handleToggleHoldChargeAttack} />}
							label="Hold Charge Attack"
						/>
					</FormGroup>
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
						<h3 style={{ marginTop: '5px', textDecoration: 'underline' }}>Skill</h3>
						{hoveredSkill.name}
						<br />
						<br />
						Cooldown: {hoveredSkill.maxCooldown}
						<br />
						<br />
						{hoveredSkill.description}
					</div>
					<div className="container">
						<h3
							style={{
								marginTop: '5px',
								textDecoration: 'underline',
							}}
						>
							Player Buffs/Debuffs
						</h3>
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
						<h3 style={{ marginTop: '5px', textDecoration: 'underline' }}>Enemy Buffs/Debuffs</h3>
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
						<li key={index}>{log}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BattleFieldRender;
