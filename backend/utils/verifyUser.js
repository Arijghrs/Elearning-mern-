import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
}; 


export const checkOwnerRole = (req, res, next) => {
    if (req.user.role !== 'owner') {
      return next(errorHandler(403, 'Access denied: Only owners can add managers.'));
    }
    next();
  };

  export const verifyRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return next(errorHandler(403, 'Access denied: Insufficient permissions.'));
    }
    next();
};


