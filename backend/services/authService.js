const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

async function registerUser(username, password) {
  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('Username already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user
  const user = new User({
    username,
    password: hashedPassword
  });
  
  await user.save();
  
  return {
    id: user._id,
    username: user.username
  };
}

async function loginUser(username, password) {
  // Find user
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }
  
  // Generate token
  const token = jwt.sign(
    { 
      id: user._id, 
      username: user.username,
      isAdmin: user.isAdmin 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin
    }
  };
}

module.exports = {
  registerUser,
  loginUser
};