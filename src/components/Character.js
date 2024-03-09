import React from 'react';

const Character = ({ name, hp, maxHp, attack, defense }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>HP: {hp}/{maxHp}</p>
      <p>Attack: {attack}</p>
      <p>Defense: {defense}</p>
    </div>
  );
};

export default Character;