import express from 'express';

import adminController from './controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Admin API!');
});

router.post('/login', adminController.login);
export default router;
