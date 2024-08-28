import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { check, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import indexRoutes from './routes/indexRoutes.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();
const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    DATABASE_URI: process.env.DATABASE_URI,
    MONGO_URI: process.env.MONGO_URI
};
const app = express();
const port = env.PORT || 3000;

// Middleware
app.use(express.json()); // Built-in JSON parsing middleware
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(morgan('combined')); // Logging middleware
app.use(helmet()); // Security headers middleware
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'UPDATE', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
};
app.use(cors(corsOptions)); // Enable CORS
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
}));

// Example of input validation with express-validator
app.use('/api/v1/example', [
    check('name').isString().withMessage('Name must be a string'),
    check('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
]);

// Error handler for validation results
app.use((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to RentMatic');
});

app.use('/api/v1', indexRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port} on ${process.env.NODE_ENV}`);
});
