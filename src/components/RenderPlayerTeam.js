import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import './BattleField.css';
import './RenderCards.css';
import Tooltip from '@mui/material/Tooltip';
import {checkWin} from './utils';

const handleSkillButton = ({
	character,
	skill,
	playerTeam,
	setPlayerTeam,
	enemyTeam,
	selectedTarget,
	gameState,
	setGameState
}) => {
	skill.cooldown = skill.maxCooldown;
	setPlayerTeam(playerTeam.map(character => ({ ...character })));
	skill.useSkill({ character, playerTeam, enemyTeam, selectedTarget });
	checkWin({playerTeam, enemyTeam, setGameState});
};

const RenderTeam = ({
	character,
	playerTeam,
	setPlayerTeam,
	enemyTeam,
	selectedTarget,
	hoveredSkill,
	setHoveredSkill,
	gameState,
	setGameState
}) => {
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
						width: `${24 + (75 * Math.log10(character.maxHealth / 500)) / 3.25}%`,
					}}
					color="primary"
				/>
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
												selectedTarget,
												gameState,
												setGameState,
											})
										}
										disabled={character.health <= 0 || skill.cooldown > 0 || gameState !== 'playing'}
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
