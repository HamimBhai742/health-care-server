import { Response } from 'express';
import httpStatusCode from 'http-status-codes';

interface MetaData {
  total: number;
}

interface ResponseData<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  metaData?: MetaData;
}

export const sendResponse = <T>(res: Response, data: ResponseData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    metaData: data.metaData,
  });
};
