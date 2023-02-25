import { Application } from 'express';
import { Server } from 'node:http';
import { WebSocket, WebSocketServer } from 'ws';
import { ServerOpCode, ClientOpCode } from 'common';

interface ExtWebSocket extends WebSocket {
	playerId?: string;
}

export function initializeWebSocket(app: Application, server: Server) {
	const wss = new WebSocketServer({ server });

	function broadcast(message: string) {
		wss.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	}

	app.players.on('connect', updatePlayercount);
	app.players.on('disconnect', updatePlayercount);

	function updatePlayercount() {
		broadcast(
			serialize({
				op: ServerOpCode.PLAYER_COUNT,
				playerCount: app.players.playerCount(),
			})
		);
	}

	wss.on('connection', (ws: ExtWebSocket) => {
		console.log('New connection');

		ws.on('message', message => {
			const { op, data } = deserialize(message.toString());
			const wsPlayer = app.players.getPlayer(ws.playerId!);

			switch (op) {
				case ClientOpCode.PING: {
					if (!wsPlayer) {
						sendMessage(ws, ServerOpCode.UNAUTHENTICATED);
						break;
					}

					console.log('Ping from', wsPlayer.username);
					app.players.refreshTimeout(wsPlayer, 15);
					break;
				}
				case ClientOpCode.LOG_IN: {
					if (wsPlayer) break;

					ws.playerId = '';
					const foundPlayer = app.players.getPlayer(data.id);

					if (!foundPlayer) {
						sendMessage(ws, ServerOpCode.LOGIN_FAILURE);
					} else {
						app.players.refreshTimeout(foundPlayer, 15);

						ws.playerId = foundPlayer.id;
						sendMessage(ws, ServerOpCode.LOGIN_SUCCESS, {
							player: {
								id: foundPlayer.id,
								username: foundPlayer.username,
							},
							playerCount: app.players.playerCount(),
						});
						console.log(foundPlayer.username, 'logged in');
					}
					break;
				}
			}
		});

		ws.on('close', () => {
			console.log('Connection closed');
		});
	});
}

function serialize(data: Record<string, unknown>): string {
	return JSON.stringify(data);
}

function deserialize(message: string) {
	return JSON.parse(message);
}

function sendMessage(ws: WebSocket, op: ServerOpCode): void;
function sendMessage(ws: WebSocket, op: ServerOpCode, data: unknown): void;
function sendMessage(ws: WebSocket, op: ServerOpCode, data?: unknown) {
	const message = serialize({ op, data });
	ws.send(message);
}
