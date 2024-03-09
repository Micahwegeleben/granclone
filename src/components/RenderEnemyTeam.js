import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import './BattleField.css';
import './RenderCards.css';

const RenderTeam = ({character, selectedTarget, handleSelectTargetButton}) => {
  return (
    <div className="character-container">
                            <img
                                src={character.img}
                                alt="example"
                                className="icon"

                            />
                            <div key={character.id}
                                className={`character-card ${character.health <= 0 ? 'dead' : ''}`}
                                style={{
                                    border: selectedTarget === character.id ? '3px solid red' : '3px solid #ccc',
                                }}
                            >
                                <p className='name'>{character.name}</p>
                                <p className='name'>{character.title}</p>
                                <p>Health: {character.health}/{character.maxHealth}</p>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={(character.health / character.maxHealth) * 100} 
                                    style={{ backgroundColor:  'red', 
                                            transition: 'background-color 0.5s ease', // Add a transition for a smoother
                                            borderRadius: '50px', // Optional: add rounded corners
                                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', // Optional: add a subtle shadow
                                            height: '12px',
                                            //create a logarithmic equation that will be used for the width of the healthbar, scaling with the maxhealth of the character. at 500 maxhealth, the width should be 25%, while at 1 million maxhealth it should be 100%
                                            width: `${30 + (75 * Math.log10(character.maxHealth / 500)) / 3.25}%`,
                                }} 
                                    color='success'
                                />
                                <p>Attack: {character.attack}</p>
                                <p>Armor: {character.armor}</p>
                            </div>
                            {character.health > 0 && <Button onClick={handleSelectTargetButton(character.id)}>Select Target</Button>}
                        </div>
  )
}

export default RenderTeam;