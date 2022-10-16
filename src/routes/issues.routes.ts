import { Router } from 'express';
import { getIssues } from '../controllers/issues';
import isAuth from '../middleware/isAuth';

const router = Router();

router.get('/:diagnosisId', isAuth, getIssues);

export default router;
