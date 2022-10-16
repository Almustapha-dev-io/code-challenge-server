import { RequestHandler } from 'express';
import { UserRole } from '../entities/User';
import APIError from '../utilities/ApiError';

const hasRole = (role: UserRole): RequestHandler => {
  return (req, res, next) => {
    try {
      if (req.user.role !== role) throw new APIError('Forbidden', 403);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default hasRole;
