import { RequestHandler } from 'express';
import { FindManyOptions } from 'typeorm';
import { Diagnosis } from '../entities/Diagnosis';
import { Issue } from '../entities/Issue';
import { diagnosisRepository, issueRepository } from '../repositories';
import APIError from '../utilities/ApiError';
import { generateAPIMedicDiagnosis } from '../utilities/apiMedicServices';

export const getDiagnosis: RequestHandler = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;
    const pageSize = +req.query.pageSize || 10;
    const category = req.query.category as any;
    const { orderBy, orderByValue } = req.query;

    const options: FindManyOptions<Diagnosis> = {
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {},
    };

    if (category && ['VALID', 'INVALID'].includes(category)) {
      options.where = { ...options.where, category };
    }

    if (orderBy && orderByValue && typeof orderBy === 'string') {
      options.order = {
        [orderBy]: orderByValue,
      };
    }

    const [diagnosis, totalCount] = await diagnosisRepository.findAndCount(
      options
    );
    res.send({ diagnosis, totalCount });
  } catch (error) {
    next(error);
  }
};

export const generateDiagnosis: RequestHandler = async (req, res, next) => {
  try {
    const { symptoms, gender, yearOfBirth } = req.query;
    const diagnosis = await generateAPIMedicDiagnosis(
      `[${symptoms as string}]`,
      gender as 'male' | 'female',
      +yearOfBirth
    );
    res.send(diagnosis);
  } catch (error) {
    next(error);
  }
};

export const saveDiagnosis: RequestHandler = async (req, res, next) => {
  try {
    const { error } = Diagnosis.validateDiagnosis(req.body);
    if (error) throw new APIError(error.details[0].message, 400);

    const {
      category,
      issues,
      patientFullName,
      patientGender,
      patientDateOfBirth,
    } = req.body;
    const diagnosis = new Diagnosis();
    diagnosis.category = category;
    diagnosis.patientFullName = patientFullName;
    diagnosis.patientGender = patientGender;
    diagnosis.patientDateOfBirth = patientDateOfBirth;

    const savedDiagnosis = await diagnosisRepository.save(diagnosis);

    await Promise.all(
      issues.map((data) => {
        const issue = new Issue();
        issue.diagnosis = savedDiagnosis;
        issue.accuracy = data.accuracy;
        issue.name = data.name;
        issue.icd = data.icd;
        issue.icdName = data.icdName;
        issue.ranking = data.ranking;
        issue.profName = data.profName;
        issue.specializationName = data.specializations.reduce(
          (acc, cur) => `${acc}${cur},`,
          ''
        );
        return issueRepository.save(issue);
      })
    );

    res.status(201).send(savedDiagnosis);
  } catch (error) {
    next(error);
  }
};

export const updateDiagnosis: RequestHandler = async (req, res, next) => {
  try {
    const { error } = Diagnosis.validateDiagnosisForUpdate(req.body);
    if (error) throw new APIError(error.details[0].message, 400);

    const { affected } = await diagnosisRepository.update(
      { id: +req.params.id },
      req.body
    );

    res.send({
      data: 'Updated diagnosis successfully',
      affectedRows: affected,
    });
  } catch (error) {
    next(error);
  }
};
