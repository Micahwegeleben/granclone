import { checkWin } from './utils';

describe('checkWin', () => {
  it("sets 'win' when all enemies have health <= 0", () => {
    const setGameState = jest.fn();
    const playerTeam = [
      { id: 1, health: 10 },
      { id: 2, health: 20 },
    ];
    const enemyTeam = [
      { id: 3, health: 0 },
      { id: 4, health: -5 },
    ];

    checkWin({ playerTeam, enemyTeam, setGameState });

    expect(setGameState).toHaveBeenCalledWith('win');
  });

  it("sets 'loss' when all players have health <= 0", () => {
    const setGameState = jest.fn();
    const playerTeam = [
      { id: 1, health: 0 },
      { id: 2, health: 0 },
    ];
    const enemyTeam = [
      { id: 3, health: 10 },
      { id: 4, health: 5 },
    ];

    checkWin({ playerTeam, enemyTeam, setGameState });

    expect(setGameState).toHaveBeenCalledWith('loss');
  });
});
