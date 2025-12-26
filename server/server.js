const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const uploadRoutes = require('./routes/upload');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Gym API is running!' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gymdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Create default admin user if it doesn't exist
  const adminUser = await User.findOne({ username: 'admin' });
  if (!adminUser) {
    const newUser = new User({
      username: 'admin',
      password: 'admin123' // This will be hashed by the pre-save middleware
    });
    await newUser.save();
    console.log('Default admin user created: admin / admin123');
  }
})
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});