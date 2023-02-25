import { Application } from 'express';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

export function setupEnv() {
	process.env.NODE_ENV ||= 'development';
}
export async function loadRouters(app: Application, baseDirectory: string) {
	baseDirectory = path.resolve(baseDirectory);
	console.log(`Loading routers from "${baseDirectory}"`);

	async function loadRoutersRecursive(dir: string, pathString: string) {
		const items = await readdir(dir);

		for (const itemName of items) {
			const itemPath = path.join(dir, itemName);
			const itemStat = await stat(itemPath);

			if (itemStat.isDirectory()) {
				loadRoutersRecursive(itemPath, `${pathString}${itemName}/`);
				continue;
			}

			if (!itemName.match(/\.(ts|js)$/i)) continue;

			let pathBaseName = itemName.replace(/\.(ts|js)$/i, '');
			if (pathBaseName === 'index') pathBaseName = '';

			const routeName = pathString + pathBaseName;

			const imports = await import('file://' + itemPath);
			const router = imports.default;
			if (!router) {
				console.warn('No router exported for', routeName);
				continue;
			}

			app.use(routeName, router);
			console.log('Loaded', routeName);
		}
	}

	await loadRoutersRecursive(baseDirectory, '/');

	console.log('Routers loaded successfully');
}
