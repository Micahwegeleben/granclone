



export const calcDamage = ({ target, attacker }) => {
    let armorCalc = target.armor;
    if (armorCalc > 50) {
        armorCalc = 50;
    }
    return attacker.attack - armorCalc;
};

export const getRandomTarget = (targetTeam) => {
    const availableTargets = targetTeam.filter(target => target.health > 0);
    const randomIndex = Math.floor(Math.random() * availableTargets.length);
    return availableTargets[randomIndex];
};

export const determineTarget = ({ targetTeam, attackerTeam, availableTargets, playerTeam, selectedTarget }) => {
    
    let target = null;
    if (attackerTeam === playerTeam) {
        target = availableTargets.find(target => target.id === selectedTarget);
        if (target === undefined) {
            target = getRandomTarget(targetTeam);
        } else {
            if (target.health <= 0) {
                target = getRandomTarget(targetTeam);
            }
        }
    } else {
        target = getRandomTarget(targetTeam);
    }
    return target;
};

export const handleDamage = ({ target, damage }) => {
    target.health -= damage;
    if (target.health < 0) {
        target.health = 0;
    }
};

export const checkWin = ({playerTeam, enemyTeam, setGameState}) => {
    const availablePlayers = playerTeam.filter(target => target.health > 0);
    const availableEnemies = enemyTeam.filter(target => target.health > 0);
    if (availableEnemies <= 0) {
        alert('Win');
        setGameState('win');
    } else {
        if (availablePlayers <= 0) {
            alert('Loss');
            setGameState('loss');
        }
    }
};