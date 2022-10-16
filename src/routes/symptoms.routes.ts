import { Router } from 'express';
import { getSymptoms } from '../controllers/symptoms';
import isAuth from '../middleware/isAuth';

const router = Router();

router.get('/', isAuth, getSymptoms);

export default router;
