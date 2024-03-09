// src/components/EnemyCharacter.js
import React from 'react';
import Character from './Character';

const EnemyCharacter = ({
  name,
  hp,
  maxHp,
  attack,
  defense,
  isCurrentDefender,
}) => {
  return (
    <div
      style={{
        border: isCurrentDefender ? '2px solid red' : '2px solid transparent',
      }}
    >
      <Character
        name={name}
        hp={hp}
        maxHp={maxHp}
        attack={attack}
        defense={defense}
      />
    </div>
  );
};

export default EnemyCharacter;