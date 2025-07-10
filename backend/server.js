import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import familyRoutes from './routes/familyRoutes.js';


dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json({ limit: '10mb' }));


// Database Connection
connectDB();

// Routes
app.use('/api/families', familyRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});