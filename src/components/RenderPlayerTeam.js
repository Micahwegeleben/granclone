import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import './BattleField.css';
import './RenderCards.css';

const RenderTeam = ({character}) => {
  return (
      <div className="character-container">
                          <img
                              src={character.img}
                              alt="example"
                              className="icon"
                          />
                          <div key={character.id} className={`character-card ${character.health <= 0 ? 'dead' : ''}`}>
                              <p className='name'>{character.name}</p>
                              <p>Health: {character.health}/{character.maxHealth}</p>
                              <LinearProgress variant="determinate" 
                                  value={(character.health / character.maxHealth) * 100} 
                                  style={{ backgroundColor:  'red', 
                                          transition: 'background-color 0.5s ease', // Add a transition for a smoother
                                          borderRadius: '50px', // Optional: add rounded corners
                                          boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', // Optional: add a subtle shadow
                                          height: '12px',
                                          width: `${30 + (75 * Math.log10(character.maxHealth / 500)) / 3.25}%`,
                              }} 
                                  color='success'
                              />
                              <p>Mana: {character.mana}/{character.maxMana}</p>
                              <LinearProgress variant="determinate" 
                                  value={(character.mana / character.maxMana) * 100} 
                                  style={{ backgroundColor:  'gray', 
                                          transition: 'background-color 0.5s ease', // Add a transition for a smoother
                                          borderRadius: '50px', // Optional: add rounded corners
                                          boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', // Optional: add a subtle shadow
                                          height: '12px',
                                          width: `${24 + (75 * Math.log10(character.maxHealth / 500)) / 3.25}%`,
                              }} 
                                  color='primary'
                              />
                              <p>Attack: {character.attack}</p>
                              <p>Armor: {character.armor}</p>
                          </div>
                      </div>
  )
}

export default RenderTeam;