import { Router } from 'express';
import APIError from '../utilities/ApiError';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    throw new APIError('not implemented', 500);
  } catch (error) {
    next(error);
  }
});

export default router;
