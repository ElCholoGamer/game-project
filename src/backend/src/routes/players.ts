import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
	const { app, body } = req;
	if (!body.username) {
		return res.standardJson(400, 'Missing username in request body');
	}

	const player = app.players.createPlayer(body.username);

	res.standardJson({ id: player.id, username: player.username });
	app.players.refreshTimeout(player.id, 20);
	console.log('Player added:', player.id, '-', player.username);
});

export default router;
