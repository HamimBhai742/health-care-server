import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { metaServices } from './meta.services';
import { IJWTPayload } from '../../types/interface';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';

const fetchDashboardData = createAsyncFn(
  async (
    req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const data = await metaServices.fetchDashboardData(req.user as IJWTPayload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Dashboard Data Retrived Successfully',
      data,
    });
  }
);

export const metaController = {
  fetchDashboardData,
};
