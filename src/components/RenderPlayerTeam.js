import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import './BattleField.css';
import './RenderCards.css';
import Tooltip from '@mui/material/Tooltip';
import { checkWin, handleDamage, battleLog } from './utils';
import { useGameState } from './GameStateContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		secondary: orange,
	},
});

const handleSkillButton = props => {
        const {
                character,
                skill,
                playerTeam,
                setPlayerTeam,
                enemyTeam,
                setEnemyTeam,
                selectedTarget,
                attackLog,
                setAttackLog,
                currentTurn,
                setGameState,
        } = props;

        if (character.mana < skill.manaCost) {
                setAttackLog(prev => [
                        ...prev,
                        `${character.name} doesn't have enough mana to cast ${skill.name}!`,
                ]);
                return;
        }

        character.mana -= skill.manaCost;
        skill.cooldown = skill.maxCooldown;

        if (skill.damage) {
                let target =
                        selectedTarget !== 0
                                ? enemyTeam.find(t => t.id === selectedTarget && t.health > 0)
                                : enemyTeam.find(t => t.health > 0);
                if (target) {
                        handleDamage({ target, damage: skill.damage });
                        battleLog({
                                attacker: character,
                                target,
                                damage: skill.damage,
                                currentTurn,
                                setAttackLog,
                                attackLog,
                        });
                }
                setEnemyTeam(enemyTeam.map(char => ({ ...char })));
        } else if (skill.healAmount) {
                character.health += skill.healAmount;
                if (character.health > character.maxHealth) {
                        character.health = character.maxHealth;
                }
                setAttackLog(prev => [
                        ...prev,
                        `${character.name} healed for ${skill.healAmount}`,
                ]);
        } else if (skill.armorIncrease) {
                character.armor += skill.armorIncrease;
                setAttackLog(prev => [
                        ...prev,
                        `${character.name} increased armor by ${skill.armorIncrease}`,
                ]);
        }

        setPlayerTeam(playerTeam.map(char => ({ ...char })));
        checkWin({ playerTeam, enemyTeam, setGameState });
};

const RenderTeam = ({ character }) => {
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
			<img src={character.img} alt="example" className="icon" />
			<div key={character.id} className={`character-card ${character.health <= 0 ? 'dead' : ''}`}>
				<p className="name">
					{character.name}
					{character.health <= 0 ? ' (Dead)' : ''}
				</p>
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
						width: `${30 + (75 * Math.log10(character.maxHealth / 500)) / 3.25}%`,
					}}
					color="success"
				/>
				<p>
					Mana: {character.mana}/{character.maxMana}
				</p>
				<LinearProgress
					variant="determinate"
					value={(character.mana / character.maxMana) * 100}
					style={{
						backgroundColor: 'gray',
						transition: 'background-color 0.5s ease', // Add a transition for a smoother
						borderRadius: '50px', // Optional: add rounded corners
						boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', // Optional: add a subtle shadow
						height: '12px',
						width: `100px`,
					}}
					color="primary"
				/>
				<p>
					Charge: {character.charge}/{character.maxCharge}
				</p>
				<ThemeProvider theme={theme}>
					<LinearProgress
						variant="determinate"
						value={(character.charge / character.maxCharge) * 100}
						style={{
							backgroundColor: 'gray',
							transition: 'background-color 0.5s ease', // Add a transition for a smoother
							borderRadius: '50px', // Optional: add rounded corners
							boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', // Optional: add a subtle shadow
							height: '12px',
							width: `100px`,
						}}
						color="secondary"
					/>
				</ThemeProvider>
				<p>Attack: {character.attack}</p>
				<p>Armor: {character.armor}</p>
			</div>
			<div className="skills">
				{character.skills.map((skill, index) => {
					return (
						<div key={index}>
							<Tooltip title={`Cooldown Remaining: ${skill.cooldown}`} followCursor>
								<span>
									<Button
										variant="contained"
										onMouseEnter={() => setHoveredSkill(skill)}
										onClick={() =>
											handleSkillButton({
												character,
												skill,
                                                                                                playerTeam,
                                                                                                setPlayerTeam,
                                                                                                enemyTeam,
                                                                                                setEnemyTeam,
                                                                                                selectedTarget,
                                                                                                attackLog,
                                                                                                setAttackLog,
                                                                                                currentTurn,
                                                                                                setGameState,
                                                                                        })
                                                                                }
                                                                                disabled={
                                                                                        character.health <= 0 ||
                                                                                        skill.cooldown > 0 ||
                                                                                        gameState !== 'playing' ||
                                                                                        character.mana < skill.manaCost
                                                                                }
                                                                                style={{
                                                                                        width: '50px',
                                                                                        height: '50px',
											borderRadius: '0px',
											margin: '4px',
											marginBottom: '0px',
											padding: '0px',
											minWidth: '50px',
										}}
									>
										{index + 1}
									</Button>
								</span>
							</Tooltip>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RenderTeam;
