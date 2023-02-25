import PlayerManager from './players';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
		}
	}

	namespace Express {
		interface Application {
			players: PlayerManager;
		}

		interface Response {
			standardJson(status: number, message: string): this;
			standardJson<K extends string>(status: number, data: Record<K, unknown>): this;
			standardJson(message: string): this;
			standardJson<K extends string>(data: Record<K, unknown>): this;
		}
	}
}

export {};
