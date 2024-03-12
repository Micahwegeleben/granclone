const initialEnemyTeam = [
	{
		id: 4,
		name: 'Gabriel',
		title: 'Primarch of Water',
		buffs: [
			{
				name: 'Attack Up',
				description: 'Increases attack by 50%',
				attackIncrease: 50,
				remainingDuration: 3,
			}
		],
		health: 10000,
		maxHealth: 10000.0,
		armor: 30,
		attack: 32,
		img: 'https://gbf.wiki/images/0/03/BattleRaid_Gabriel_Thumb.png',
	},
	{
		id: 5,
		name: 'Michael',
		title: 'Primarch of Fire',
		buffs: [],
		health: 10000,
		maxHealth: 10000.0,
		armor: 30,
		attack: 32,
		img: 'https://gbf.wiki/images/5/50/BattleRaid_Michael_Thumb.png',
	},
	{
		id: 6,
		name: 'Uriel',
		title: 'Primarch of Earth',
		buffs: [],
		health: 10000,
		maxHealth: 10000.0,
		armor: 30,
		attack: 32,
		img: 'https://gbf.wiki/images/2/2f/BattleRaid_Uriel_Thumb.png',
	},
];

export default initialEnemyTeam;
