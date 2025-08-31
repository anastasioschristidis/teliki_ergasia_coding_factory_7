const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes')); 

// Στατικές εικόνες
app.use('/uploads', express.static('uploads'));

module.exports = app;
