export enum ClientOpCode {
	PING = 0,
	LOG_IN = 1,
}

export enum ServerOpCode {
	PLAYER_COUNT = 0,
	LOGIN_SUCCESS = 1,
	LOGIN_FAILURE = 2,
	UNAUTHENTICATED = 3,
}
