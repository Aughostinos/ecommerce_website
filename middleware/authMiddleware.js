import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Authenticate user and attach user data to the request
export const authenticateUser = async (req, res, next) => {
  try {
    // Retrieve token from cookies or Authorization header
    let token = req.cookies.jwt;
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]; // Extract token from header
    }


    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach user object to the request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication Error:', error.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Admin authentication middleware
export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};
