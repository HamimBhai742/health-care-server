import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { appoinmentServices } from './appoinment.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';
import { pickQuery } from '../../utils/pick.query';
import { IJWTPayload } from '../../types/interface';

const createAppoinment = createAsyncFn(
  async (
    req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user as IJWTPayload;
    const data = await appoinmentServices.createAppoinment(user, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: 'Appoinment Created Successfully',
      data,
    });
  }
);

const getMyAppoinments = createAsyncFn(
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const user = req.user;
    const options = pickQuery(req.query, [
      'limit',
      'page',
      'search',
      'sortBy',
      'sortOrder',
    ]);

    const filters = pickQuery(req.query, ['status', 'paymentStatus']);
    const data = await appoinmentServices.getMyAppoinments(
      user,
      filters,
      options
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Appoinment Retrived Successfully',
      data: data.data,
      metaData: data.metaData,
    });
  }
);

const getAllAppoinments = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const options = pickQuery(req.query, [
      'limit',
      'page',
      'search',
      'sortBy',
      'sortOrder',
    ]);
    const filters = pickQuery(req.query, ['status', 'paymentStatus']);
    const data = await appoinmentServices.getAllAppoinments(filters, options);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Appoinment Retrived Successfully',
      data: data.data,
      metaData: data.metaData,
    });
  }
);

const updateAppoinment = createAsyncFn(
  async (
    req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user as IJWTPayload;
    const { status } = req.body;
    const { appointmentId } = req.params;
    const data = await appoinmentServices.updateAppoinment(
      appointmentId,
      status,
      user
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Appoinment Updated Successfully',
      data,
    });appointmentId
  }
);

export const appoinmentController = {
  createAppoinment,
  getMyAppoinments,
  getAllAppoinments,
  updateAppoinment,
};
