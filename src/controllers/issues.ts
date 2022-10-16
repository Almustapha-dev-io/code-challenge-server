import { RequestHandler } from 'express';
import { issueRepository } from '../repositories';

export const getIssues: RequestHandler = async (req, res, next) => {
  try {
    const issues = await issueRepository.findBy({
      diagnosis: {
        id: +req.params.diagnosisId,
      },
    });
    res.send(issues);
  } catch (error) {
    next(error);
  }
};
