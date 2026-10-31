
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import plantRoutes from './routes/plantRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Health-check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Paradise Nursery API is running',
  });
});

// Plant API routes
app.use('/api/plants', plantRoutes);

// Authentication API routes
app.use('/api/auth', authRoutes);

// Start server only after database connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
