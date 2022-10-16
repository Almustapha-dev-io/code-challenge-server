import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import symptomRoutes from './symptoms.routes';
import diagnosisRoutes from './diagnosis.routes';
import issuesRoutes from './issues.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/symptoms', symptomRoutes);
router.use('/diagnosis', diagnosisRoutes);
router.use('/issues', issuesRoutes);

export default router;
