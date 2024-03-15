import React, { useState } from 'react';
import './BattleField.css';
import Button from '@mui/material/Button';
import RenderPlayerTeam from './RenderPlayerTeam';
import RenderEnemyTeam from './RenderEnemyTeam';
import { calcDamage, determineTarget, handleDamage, checkWin, battleLog, handleChargeGain } from './utils';
import { useGameState } from './GameStateContext';
import BattleFieldRender from './BattleFieldRender';

const Game = () => {
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

	React.useEffect(() => {
		playerTeam.forEach(character => {
			character.skills.forEach(skill => {
				if (skill.cooldown > 0) {
					skill.cooldown -= 1;
				}
			});
			character.buffs.forEach(buff => {
				if (buff.remainingDuration > 0) {
					buff.remainingDuration -= 1;
					if (buff.remainingDuration === 0) {
						///then remove the buff
						const index = character.buffs.indexOf(buff);
						if (index > -1) {
							character.buffs.splice(index, 1);
						}
					}
				}
			});
		});
		enemyTeam.forEach(character => {
			character.buffs.forEach(buff => {
				if (buff.remainingDuration > 0) {
					buff.remainingDuration -= 1;
					if (buff.remainingDuration === 0) {
						///then remove the buff
						const index = character.buffs.indexOf(buff);
						if (index > -1) {
							character.buffs.splice(index, 1);
						}
					}
				}
			});
		});
		setPlayerTeam(playerTeam.map(character => ({ ...character })));
	}, [currentTurn]);

	React.useEffect(() => {
		console.log(hoveredSkill);
	}, [hoveredSkill]);

	const applyBuff = (character, buffName, remainingDuration) => {
		const newBuff = { name: buffName, remainingDuration };

		// Check if a similar buff already exists, and update its duration if so
		const existingBuffIndex = character.buffs.findIndex(buff => buff.name === buffName);
		if (existingBuffIndex !== -1) {
			character.buffs[existingBuffIndex].remainingDuration = remainingDuration;
		} else {
			character.buffs.push(newBuff);
		}

		// Return the updated character object
		return { ...character };
	};

	const attackCharge = (attacker, target) => {
		let damage = calcDamage({ target, attacker }) * 2;
		handleDamage({ target, damage });
		attacker.charge = 0;
		battleLog({ attacker, target, damage, currentTurn, setAttackLog });
	};
	const attackNormal = (attacker, target) => {
		let damage = calcDamage({ target, attacker });
		handleDamage({ target, damage });
		battleLog({ attacker, target, damage, currentTurn, setAttackLog });
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
							playerTeam,
							selectedTarget,
						});
						if (target !== undefined) {
							if (attacker.charge >= 100) {
								attackCharge(attacker, target);
								attacker.chargeLockOut = true;
								attackerTeam.forEach(char => {
									if (char.id !== attacker.id) {
										if (char.chargeLockOut === false) {
											console.log(char.chargeLockOut);
											handleChargeGain({ attacker: char, times: 1 });
										}
									}
								});
							} else {
								attackNormal(attacker, target);
								if (attackerTeam === playerTeam) {
									handleChargeGain({ attacker, times: 1 });
								}
							}
						}
					}
				});
				if (attackerTeam === playerTeam) {
					attackerTeam.forEach(char => {
						char.chargeLockOut = false;
					});
				}
				if (availableTargets.find(target => target.id === selectedTarget) !== undefined) {
					if (selectedTarget !== 0) {
						const selectedTargetObj = updatedTargetTeam.find(target => target.id === selectedTarget);
						if (selectedTargetObj.health <= 0) {
							setSelectedTarget(0);
						}
					}
				}
				setTargetTeam(updatedTargetTeam);
				checkWin({ playerTeam, enemyTeam, setGameState });
			} //end of middle if
		} //end of main if
	};

	/* ---------------------------------------------- */
	return <BattleFieldRender globalAttack={globalAttack} />;
};

export default Game;
