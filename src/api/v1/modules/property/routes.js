import express from 'express';

import PropertyController from './controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the User API!');
});

router.post('/create-property', PropertyController.createProperty);
export default router;
