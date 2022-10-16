import { RequestHandler } from 'express';
import { getAPIMedicSymptoms } from '../utilities/apiMedicServices';

export const getSymptoms: RequestHandler = async (req, res, next) => {
  try {
    const symptoms = await getAPIMedicSymptoms();
    res.send(symptoms.map(({ ID: id, Name: name }) => ({ id, name })));
  } catch (error) {
    next(error);
  }
};
