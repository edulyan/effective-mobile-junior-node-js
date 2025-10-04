import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';

export function validateData(schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        errors: result.error.issues.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        })),
      });
    }

    next();
  };
}
