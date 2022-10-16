import _ from 'lodash';
import { RequestHandler } from 'express';
import { userRepository } from '../repositories';
import APIError from '../utilities/ApiError';
import { validateString } from '../utilities/hash';

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password)
      throw new APIError('"userName" and "password" fields are required', 400);

    const existingUser = await userRepository.findOne({
      where: { userName },
    });
    if (!existingUser) throw new APIError('Invalid username or password', 400);

    const passwordValid = await validateString(password, existingUser.password);
    if (!passwordValid) throw new APIError('Invalid username or password', 400);

    const token = await existingUser.generateAuthToken();
    const user = _.pick(existingUser, [
      'id',
      'userName',
      'firstName',
      'lastName',
      'role',
    ]);

    const specializations: string[] = [];
    if (existingUser.specialization) {
      specializations.push(...existingUser.specialization.split(','));
    }
    res.status(200).send({
      token,
      user: { ...user, specializations },
    });
  } catch (error) {
    if (!error.code) error.code = 500;
    next(error);
  }
};
