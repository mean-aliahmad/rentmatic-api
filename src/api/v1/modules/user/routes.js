import express from 'express';

import multer from 'multer';

import { check } from 'express-validator';

import UserController from './controller.js';

import middleware from '../../../../middleware/authentication.js';

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.memoryStorage();

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.send('Welcome to the User API!');
});
router.post('/login', [(check('email').isString().withMessage('Email is required.'), check('password').isString().withMessage('Password is required.'))], UserController.login);
router.post('/create-user', middleware.validateToken, upload.any(), UserController.createUser);
router.get('/userDetail', UserController.getUserDetails);
export default router;
