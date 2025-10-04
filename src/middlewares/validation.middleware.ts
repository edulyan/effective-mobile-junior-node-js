import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';

export function validateBody(schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        errors: result.error.issues.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        })),
      });
    }

    next();
  };
}

export function validateParams(schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      res.status(400).json({
        errors: result.error.issues.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        })),
      });
    }

    next();
  };
}
