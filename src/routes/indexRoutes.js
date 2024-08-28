import express from 'express';

import userRoutes from '../api/v1/modules/user/routes.js';

import PropertyRoutes from '../api/v1/modules/property/routes.js';

import adminRoutes from '../api/v1/modules/admin/routes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the V1 API!');
});

router.use('/user', userRoutes);
router.use('/properties', PropertyRoutes);
router.use('/admin', adminRoutes);
export default router;
