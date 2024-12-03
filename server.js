const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'https://triumphant-crm-backend.vercel.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],
    credentials: true,
};
app.use(cors(corsOptions));

// Preflight request handling for all routes
app.options('*', cors(corsOptions));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/vehiclesales', require('./routes/vehicleSaleRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Sample route for testing
app.get('/', (req, res) => res.send('API Running...'));

// Export the app for serverless deployment
module.exports = app;
