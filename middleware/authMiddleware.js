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

    console.log('Received JWT:', token);

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);

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

// Middleware to provide user data for templates
export const getUserData = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      res.locals.user = user;
    } else {
      res.locals.user = null;
    }
    next();
  } catch (error) {
    console.error(error.message);
    res.locals.user = null;
    next();
  }
};

// Admin authentication middleware
export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as admin' });
  }
};

