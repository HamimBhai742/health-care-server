import httpStatusCode from 'http-status-codes';
import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const globalErrorHandel = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  const errSource: any = [];

  const handelZodError = (err: any) => {
    statusCode = 400;
    message = 'Zod error';
    err.issues.forEach((i: any) => {
      errSource.push({
        path: i.path[i.path.length - 1],
        message: i.message,
      });
    });
  };

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = httpStatusCode.CONFLICT;
      message = 'Duplicate field value';

      errSource.push(err.meta);
    }
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      statusCode = httpStatusCode.NOT_FOUND;
      message = 'Data not found';
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatusCode.BAD_REQUEST;
    const lines = err.message.split('\n');
    message = lines[lines.length - 1].trim();
  }

  if (err.name === 'ZodError') {
    handelZodError(err);
  }
  console.log(err.name);
  res.status(statusCode).json({
    success: false,
    message,
    errSource,
  });
};
