import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { doctorScheduleServices } from './doctor.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';

const createDoctorSchedule = createAsyncFn(
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const data = await doctorScheduleServices.createDoctorSchedule(req.user, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: 'Doctor Schedule Created Successfully',
      data,
    });
  }
);

export const doctorScheduleController = {
  createDoctorSchedule,
};
