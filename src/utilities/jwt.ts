import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';

export const generateJWT = (
  payload: object | string | Buffer,
  secret: string,
  opts?: SignOptions
) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, opts, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

export const verifyJWT = (
  token: string,
  secret: string,
  opts?: VerifyOptions
) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, opts, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};
