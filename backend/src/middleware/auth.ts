import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import { User, IUser } from '../models';

export interface AuthRequest extends Request {
  user?: IUser;
}

interface JWTPayload extends JwtPayload {
  userId: string;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    console.log('Auth middleware - Headers:', req.headers);
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth middleware - Token:', token ? 'Present' : 'Missing');

    if (!token) {
      console.log('Auth middleware - No token found');
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    console.log('Auth middleware - Decoded token:', { userId: decoded.userId });

    const user = await User.findById(decoded.userId).select('-password');
    console.log('Auth middleware - User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('Auth middleware - User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    console.log('Auth middleware - Authentication successful');
    next();
  } catch (error) {
    console.error('Auth middleware - Error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log('Authorize middleware - User:', req.user ? 'Present' : 'Missing');
    console.log('Authorize middleware - Required roles:', roles);
    console.log('Authorize middleware - User role:', req.user?.role);

    if (!req.user) {
      console.log('Authorize middleware - No user found');
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      console.log('Authorize middleware - Access denied');
      return res.status(403).json({ message: 'Access denied' });
    }

    console.log('Authorize middleware - Authorization successful');
    next();
  };
}; 