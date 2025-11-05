import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { userServices } from '../user/user.services';
import httpStatusCode from 'http-status-codes';
import { sendResponse } from '../../utils/send.response';
import { scheduleServices } from './schedule.services';
import { pickQuery } from '../../utils/pick.query';

const createSchedule = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await scheduleServices.createSchedule(req.body);
    console.log(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: 'Schedule Created Successfully',
      data,
    });
  }
);

const getAllSchedule = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const options = pickQuery(req.query, [
      'limit',
      'page',
      'search',
      'sortBy',
      'sortOrder',
    ]);
    const filters = pickQuery(req.query, ['filterStartDateTime', 'filterEndDateTime']);
    const data = await scheduleServices.getAllSchedule(filters, options);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Schedule Retrived Successfully',
      data: data.schedules,
      metaData: data.metaData,
    });
  }
);

const deleteSchedule = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await scheduleServices.deleteSchedule(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Schedule Deleted Successfully',
      data,
    });
  }
);

export const scheduleController = {
  createSchedule,
  getAllSchedule,
  deleteSchedule,
};
