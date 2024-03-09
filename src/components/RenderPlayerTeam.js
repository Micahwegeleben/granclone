import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import './BattleField.css';
import './RenderCards.css';

const handleSkillButton = ({
	character,
	skill,
	playerTeam,
	setPlayerTeam,
	checkWin,
	enemyTeam,
	selectedTarget,
	getRandomTarget,
}) => {
	//put skill on cooldown
	skill.cooldown = skill.maxCooldown;
	setPlayerTeam(playerTeam.map(character => ({ ...character })));
	skill.useSkill({ character, playerTeam, enemyTeam, selectedTarget });
	checkWin();
};

const RenderTeam = ({
	character,
	playerTeam,
	setPlayerTeam,
	checkWin,
	gameState,
	enemyTeam,
	selectedTarget,
	getRandomTarget,
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
							<Button
								variant="contained"
								onClick={() =>
									handleSkillButton({
										character,
										skill,
										playerTeam,
										setPlayerTeam,
										checkWin,
										enemyTeam,
										selectedTarget,
										getRandomTarget,
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
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RenderTeam;
