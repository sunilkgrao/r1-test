import jwt from 'jsonwebtoken';
import { config } from '../config';
import { logger } from '../utils/logger';

export const authenticate = (req: any, res: any, next: any) => {
  const token = req.header('X-Auth-Token') || req.query.token;
  
  if (!token) {
    return res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(`Authentication failed: ${error.message}`);
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};
