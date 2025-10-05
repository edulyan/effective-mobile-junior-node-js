import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../common/errors';

export default function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(err.statusCode).json({ message: err.message || 'Internal server error' });
}
