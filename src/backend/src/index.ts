import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRouters, setupEnv } from './init.js';
import { extendResponse } from './middleware/extend-response.js';
import { initializeWebSocket } from './socket.js';
import PlayerManager from './players.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setupEnv();

const app = express();
const server = createServer(app);

app.players = new PlayerManager();

app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(extendResponse());

await loadRouters(app, path.join(__dirname, 'routes'));

app.all('/*', (req, res) => res.standardJson(404, 'Not found'));

initializeWebSocket(app, server);

const port = process.env.PORT || 8080;

server.listen(port, () => {
	console.log('Listening on port', port);
});
