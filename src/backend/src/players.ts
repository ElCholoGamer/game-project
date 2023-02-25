import { randomUUID } from 'node:crypto';
import TypedEventEmitter from './util/typed-event-emitter.js';

export interface Player {
	id: string;
	username: string;
	timeoutHandle?: NodeJS.Timeout;
}

export interface Events {
	connect: [player: Player];
	disconnect: [player: Player];
}

class PlayerManager extends TypedEventEmitter<Events> {
	private readonly players: Record<string, Player> = {};

	public createPlayer(username: string): Player {
		const player = {
			id: randomUUID(),
			username: username.trim().replace(/\s+/g, ' '),
		};

		this.players[player.id] = player;
		this.emit('connect', player);
		return player;
	}

	public getPlayer(id: string): Player | undefined {
		return this.players[id];
	}

	public refreshTimeout(player: Player, delaySeconds: number): void;
	public refreshTimeout(playerId: string, delaySeconds: number): void;
	public refreshTimeout(playerOrId: Player | string, delaySeconds: number) {
		if (typeof playerOrId === 'string') playerOrId = this.players[playerOrId];

		const player = playerOrId as Player;

		if (player.timeoutHandle) clearTimeout(player.timeoutHandle);

		player.timeoutHandle = setTimeout(() => {
			delete this.players[player.id];
			this.emit('disconnect', player);
			console.log('Player disconnected:', player.username);
		}, delaySeconds * 1000);
	}

	public playerCount() {
		return Object.keys(this.players).length;
	}
}

export default PlayerManager;
