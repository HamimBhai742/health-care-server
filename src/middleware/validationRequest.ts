import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

export const validationRequest =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body.data)
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      req.body=await schema.parseAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
