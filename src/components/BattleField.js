import React, { useState } from 'react';
import './BattleField.css';
import Button from '@mui/material/Button';
import RenderPlayerTeam from './RenderPlayerTeam';
import RenderEnemyTeam from './RenderEnemyTeam';
import initialPlayerTeam from '../data/playerCharacters';
import initialEnemyTeam from '../data/enemyCharacters';

const Game = () => {
	const [playerTeam, setPlayerTeam] = useState(initialPlayerTeam);
	const [enemyTeam, setEnemyTeam] = useState(initialEnemyTeam);
	const [attackLog, setAttackLog] = useState([]);
	const [currentTurn, setCurrentTurn] = useState(1);
	const [selectedTarget, setSelectedTarget] = useState(0);
	const [gameState, setGameState] = useState('playing');
	const [hoveredSkill, setHoveredSkill] = useState(playerTeam[0].skills[0]);

	React.useEffect(() => {
		playerTeam.forEach(character => {
			character.skills.forEach(skill => {
				if (skill.cooldown > 0) {
					skill.cooldown -= 1;
				}
			});
			character.buffs.forEach(buff => {
				if (buff.duration > 0) {
					buff.duration -= 1;
				}
			});
		});
		setPlayerTeam(playerTeam.map(character => ({ ...character })));
	}, [currentTurn]);

	React.useEffect(() => {
		console.log(hoveredSkill);
	}, [hoveredSkill]);

	const applyBuff = (character, buffType, duration) => {
		const newBuff = { type: buffType, duration };

		// Check if a similar buff already exists, and update its duration if so
		const existingBuffIndex = character.buffs.findIndex(buff => buff.type === buffType);
		if (existingBuffIndex !== -1) {
			character.buffs[existingBuffIndex].duration = duration;
		} else {
			character.buffs.push(newBuff);
		}

		// Return the updated character object
		return { ...character };
	};

	const getRandomTarget = targetTeam => {
		const availableTargets = targetTeam.filter(target => target.health > 0);
		const randomIndex = Math.floor(Math.random() * availableTargets.length);
		return availableTargets[randomIndex];
	};
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

	const determineTarget = ({ targetTeam, attackerTeam, availableTargets }) => {
		let target = null;
		if (attackerTeam === playerTeam) {
			target = availableTargets.find(target => target.id === selectedTarget);
			if (target === undefined) {
				target = getRandomTarget(targetTeam);
			} else {
				if (target.health <= 0) {
					target = getRandomTarget(targetTeam);
				}
			}
		} else {
			target = getRandomTarget(targetTeam);
		}
		return target;
	};

	const calcDamage = ({ target, attacker }) => {
		let armorCalc = target.armor;
		if (armorCalc > 50) {
			armorCalc = 50;
		}
		return attacker.attack - armorCalc;
	};

	const handleDamage = ({ target, damage }) => {
		target.health -= damage;
		if (target.health < 0) {
			target.health = 0;
		}
	};

	const battleLog = ({ attacker, target, damage }) => {
		const attackDetails = {
			turn: currentTurn,
			attacker: attacker.name,
			defender: target.name,
			damage: damage,
			remainingHealth: target.health,
		};
		setAttackLog(prevLog => [...prevLog, attackDetails]);
	};

	const globalAttack = (targetTeam, setTargetTeam, attackerTeam) => {
		if (gameState === 'playing') {
			const availableTargets = targetTeam.filter(target => target.health > 0);
			const availableAttackers = attackerTeam.filter(attacker => attacker.health > 0);
			const updatedTargetTeam = [...targetTeam];
			if (Array.isArray(availableTargets) && availableTargets.length > 0 && availableAttackers.length > 0) {
				setCurrentTurn(currentTurn + 1);
				attackerTeam.forEach(attacker => {
					if (attacker.health > 0) {
						let target = determineTarget({
							targetTeam,
							attackerTeam,
							availableTargets,
						});
						if (target !== undefined) {
							let damage = calcDamage({ target, attacker });
							handleDamage({ target, damage });
							battleLog({ attacker, target, damage });
						}
					}
				});
				if (availableTargets.find(target => target.id === selectedTarget) !== undefined) {
					if (selectedTarget !== 0) {
						const selectedTargetObj = updatedTargetTeam.find(target => target.id === selectedTarget);
						if (selectedTargetObj.health <= 0) {
							setSelectedTarget(0);
						}
					}
				}
				setTargetTeam(updatedTargetTeam);
				checkWin();
			}
		}
	};
	const checkWin = () => {
		const availablePlayers = playerTeam.filter(target => target.health > 0);
		const availableEnemies = enemyTeam.filter(target => target.health > 0);
		if (availableEnemies <= 0) {
			alert('Win');
			setGameState('win');
		} else {
			if (availablePlayers <= 0) {
				alert('Loss');
				setGameState('loss');
			}
		}
	};
	/* ---------------------------------------------- */
	return (
		<div>
			<h1>Granblue Clone</h1>
			<div className="teams-wrapper">
				<div className="team-container">
					<h2>Player Team</h2>
					{playerTeam.map(character => (
						<RenderPlayerTeam
							character={character}
							playerTeam={playerTeam}
							setPlayerTeam={setPlayerTeam}
							checkWin={checkWin}
							gameState={gameState}
							enemyTeam={enemyTeam}
							selectedTarget={selectedTarget}
							getRandomTarget={getRandomTarget}
							hoveredSkill={hoveredSkill}
							setHoveredSkill={setHoveredSkill}
						/>
					))}
				</div>
				<div>
					<div className="container">
						{hoveredSkill.name}
						<br />
						<br />
						Cooldown: {hoveredSkill.maxCooldown}
						<br />
						<br />
						{hoveredSkill.description}
					</div>
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
							top: '50%',
							border: '6px inset #c76c03',
						}}
					>
						Attack
					</Button>
				</div>
				<div className="team-container">
					<h2>Enemy Team</h2>
					{enemyTeam.map(character => (
						<RenderEnemyTeam
							character={character}
							selectedTarget={selectedTarget}
							handleSelectTargetButton={handleSelectTargetButton}
						/>
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

export default Game;
