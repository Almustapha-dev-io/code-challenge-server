import { AppDataSource } from '../db/data-source';
import { Diagnosis } from '../entities/Diagnosis';
import { Issue } from '../entities/Issue';
import { User } from '../entities/User';

export const userRepository = AppDataSource.getRepository(User);
export const diagnosisRepository = AppDataSource.getRepository(Diagnosis);
export const issueRepository = AppDataSource.getRepository(Issue);
