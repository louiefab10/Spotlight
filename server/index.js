const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const chartRoutes = require('./routes/chart');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/chart', chartRoutes);
// Test route
app.get('/', (req, res) => {
    res.send('Music Chart API is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });