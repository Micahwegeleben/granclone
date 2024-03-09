import React, { useState } from 'react';
import './BattleField.css';

const initialPlayerTeam = [
    { id: 1, name: 'GOOD1', health: 100.0, armor: 0, defense: 0, attack: 140 },
    { id: 2, name: 'GOOD2', health: 100.0, armor: 0, defense: 0, attack: 15 },
    { id: 3, name: 'GOOD3', health: 100.0, armor: 0, defense: 0, attack: 16 },
];

const initialEnemyTeam = [
    { id: 4, name: 'BAD1', health: 100, armor: 0, defense: 0, attack: 110 },
    { id: 5, name: 'BAD2', health: 100, armor: 0, defense: 0, attack: 12 },
    { id: 6, name: 'BAD3', health: 100, armor: 0, defense: 0, attack: 13 },
];

const Game = () => {
    const [playerTeam, setPlayerTeam] = useState(initialPlayerTeam);
    const [enemyTeam, setEnemyTeam] = useState(initialEnemyTeam);
    const [attackLog, setAttackLog] = useState([]);
    const [currentTurn, setCurrentTurn] = useState(0);

    const getRandomTarget = (targetTeam) => {
        const availableTargets = targetTeam.filter(target => target.health > 0)
        const randomIndex = Math.floor(Math.random() * availableTargets.length)
        return availableTargets[randomIndex]
    }
    const handleReload = () => {
        window.location.reload();
    };

    const handleAttackButton = () => {
        globalAttack(enemyTeam, setEnemyTeam, playerTeam)
        globalAttack(playerTeam, setPlayerTeam, enemyTeam)
    }
    const globalAttack = (targetTeam, setTargetTeam, attackerTeam) => {
        const availableTargets = targetTeam.filter(target => target.health > 0)
        const availableAttackers = attackerTeam.filter(attacker => attacker.health > 0)
        const updatedTargetTeam = [...targetTeam]
        if (Array.isArray(availableTargets) && availableTargets.length > 0 && availableAttackers.length > 0) {
            setCurrentTurn(currentTurn + 1)
            attackerTeam.forEach(attacker => {
                const randomTarget = getRandomTarget(targetTeam);
                if (randomTarget !== undefined) {
                    const damage = attacker.attack
                    randomTarget.health -= damage
                    const attackDetails = {
                        turn: currentTurn,
                        attacker: attacker.name,
                        defender: randomTarget.name,
                        damage: damage,
                    }
                    setAttackLog(prevLog => [...prevLog, attackDetails]);
                }
            })
            setTargetTeam(updatedTargetTeam)
            checkWin()
        }

    }

    const checkWin = () => {
        const availablePlayers = playerTeam.filter(target => target.health > 0)
        const availableEnemies = enemyTeam.filter(target => target.health > 0)
        if (availableEnemies <= 0) {
            alert("Win")
        }
        else {
            if (availablePlayers <= 0) {
                alert("Loss")
            }
        }
    }


    /* ---------------------------------------------- */

    return (
        <div>
            <h1>My Awesome RPG Game</h1>
            <div className="teams-wrapper">

                <div className="team-container">
                    <h2>Player Team</h2>
                    {playerTeam.map(character => (
                        <div key={character.id} className={`character-card ${character.health <= 0 ? 'dead' : ''}`}>
                            <p>Name: {character.name}</p>
                            <p>Health: {character.health}</p>
                            <p>Armor: {character.armor}</p>
                            <p>Defense: {character.defense}</p>
                            <p>Attack: {character.attack}</p>
                        </div>
                    ))}
                </div>

                <div className="team-container">
                    <h2>Enemy Team</h2>
                    {enemyTeam.map(character => (
                        <div className="container">
                            <div key={character.id} className={`character-card ${character.health <= 0 ? 'dead' : ''}`}>
                                <p>Name: {character.name}</p>
                                <p>Health: {character.health}</p>
                                <p>Armor: {character.armor}</p>
                                <p>Defense: {character.defense}</p>
                                <p>Attack: {character.attack}</p>
                            </div>
                            <img
                                src="https://th.bing.com/th/id/OIP.FElMdumgHUSEUmMNXiZK7AHaHa?rs=1&pid=ImgDetMain"
                                alt="example"
                                style={{ maxWidth: '80px', maxHeight: '80px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>


            <button onClick={handleAttackButton}>Attack</button>
            <button onClick={handleReload}>New Game</button>

            <div>
                <h2>Attack Log</h2>
                <ul>
                    {attackLog.map((log, index) => (
                        <li key={index}>
                            {`Turn ${log.turn}: ${log.attacker} attacked ${log.defender} for ${log.damage} damage`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Game;
