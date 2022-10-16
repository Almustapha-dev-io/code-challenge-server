import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  let code = error.code < 500 ? error.code : 500;
  let message =
    error.code < 500 ? error.message : 'Something failed on the server.';

  console.log(error.originalError ? error.originalError : error);

  res.status(code).send({
    message,
    code,
  });
};

export default errorMiddleware;
