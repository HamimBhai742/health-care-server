import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';
import { userServices } from './user.services';
import { pickQuery } from '../../utils/pick.query';
import { IJWTPayload } from '../../types/interface';

const createPatient = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userServices.createPatient(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: 'Patient Created Successfully',
      data,
    });
  }
);

const createDoctor = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userServices.createDoctor(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: 'Doctor Created Successfully',
      data,
    });
  }
);

const createAdmin = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userServices.createAdmin(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: 'Admin Created Successfully',
      data,
    });
  }
);

const getAllUsers = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const options = pickQuery(req.query, [
      'limit',
      'page',
      'search',
      'sortBy',
      'sortOrder',
    ]);
    const filters = pickQuery(req.query, ['role', 'status']);
    const data = await userServices.getAllUser(filters, options);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'User Retrived Successfully',
      data: data.user,
      metaData: data.metaData,
    });
  }
);

const getMe = createAsyncFn(
  async (
    req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const data = await userServices.getMe(req.user as IJWTPayload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'User Retrived Successfully',
      data,
    });
  }
);

const deleteUser = createAsyncFn(
  async (
    req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const data = await userServices.deleteUser(req.user as IJWTPayload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'User Deleted Successfully',
      data,
    });
  }
);

export const userController = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUsers,
  getMe,
  deleteUser,
};
