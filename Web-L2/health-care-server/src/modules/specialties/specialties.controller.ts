import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { specialtiesService } from './specialties.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';

const createSpecialties = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await specialtiesService.createSpecialties(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: 'Specialties Created Successfully',
      data,
    });
  }
);

const getAllSpecialties = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await specialtiesService.getAllSpecialties();
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Specialties Retrived Successfully',
      data,
    });
  }
);

const deleteSpecialties = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await specialtiesService.deleteSpecialties(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Specialties Deleted Successfully',
      data,
    });
  }
);
export const specialtiesController = {
  createSpecialties,
  getAllSpecialties,
  deleteSpecialties,
};
