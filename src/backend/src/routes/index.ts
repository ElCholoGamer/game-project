import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.standardJson('Hello, world!');
});

export default router;
