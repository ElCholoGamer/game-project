export function randomInt(min: number, max: number): number {
	if (max < min) throw new Error('invalid range');
	return Math.floor(Math.random() * (max - min) + min);
}

export function chooseRandom<T>(elements: T[]): T {
	return elements[randomInt(0, elements.length)];
}

export function generateRandomUsername(): string {
	const prefix = chooseRandom(['', 'El', 'Super', 'Mega', 'Ete', 'Hiper', 'XX', 'Master']);
	const name = chooseRandom([
		'Crack',
		'Pro',
		'Máquina',
		'Bestia',
		'Gamer',
		'Pato',
		'Saiyajin',
		'Lucho',
		'Pepe',
		'Edu',
		'Pepito',
		'Cabrito',
		'Jetón',
		'Inmortal',
		'N00B',
		'Slayer',
		'Emperador',
	]);

	return `${prefix}${name}${randomInt(10, 1000)}`;
}
