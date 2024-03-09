// src/components/PlayerCharacter.js
import React from 'react';
import Character from './Character';

const PlayerCharacter = ({
  name,
  hp,
  maxHp,
  attack,
  defense,
  isCurrentAttacker,
  handleAttack,
}) => {
  return (
    <div
      style={{
        border: isCurrentAttacker ? '2px solid green' : '2px solid transparent',
      }}
    >
      <Character
        name={name}
        hp={hp}
        maxHp={maxHp}
        attack={attack}
        defense={defense}
      />
      {isCurrentAttacker && <button onClick={handleAttack}>Attack</button>}
    </div>
  );
};

export default PlayerCharacter;