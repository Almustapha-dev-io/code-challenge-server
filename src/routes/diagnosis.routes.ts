import { Router } from 'express';
import {
  generateDiagnosis,
  getDiagnosis,
  saveDiagnosis,
  updateDiagnosis,
} from '../controllers/diagnosis';
import { validateDiagnosisQuery } from '../middleware/diagnosis';
import isAuth from '../middleware/isAuth';

const router = Router();

router.get('/initial', isAuth, validateDiagnosisQuery, generateDiagnosis);
router.post('/', isAuth, saveDiagnosis);
router.get('/', isAuth, getDiagnosis);
router.put('/:id', isAuth, updateDiagnosis);

export default router;
