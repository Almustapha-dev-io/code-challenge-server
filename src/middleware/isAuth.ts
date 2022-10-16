import { Request, RequestHandler } from 'express';
import { User } from '../entities/User';
import { userRepository } from '../repositories';
import APIError from '../utilities/ApiError';
import { JWT_SECRET } from '../utilities/env';
import { verifyJWT } from '../utilities/jwt';

interface CustomRequest extends Request {
  user: User;
}

const isAuth: RequestHandler = async (req: CustomRequest, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new APIError('Full authentication is required', 401);

    const authHeaderParts = authHeader.trim().split(' ');
    if (authHeaderParts.length !== 2) throw new APIError('Invalid token', 401);
    if (authHeaderParts[0].toLowerCase() !== 'bearer')
      throw new APIError('Invalid or expired token', 401);

    const payload = await verifyJWT(authHeaderParts[1], JWT_SECRET);
    const user = await userRepository.findOneBy({ id: (payload as any).id });
    if (!user) throw new APIError('Invalid or expired token', 401);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuth;
