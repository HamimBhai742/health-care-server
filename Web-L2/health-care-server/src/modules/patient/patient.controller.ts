import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { patientServices } from './patient.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';
import { pickQuery } from '../../utils/pick.query';
import { IJWTPayload } from '../../types/interface';

const getAllPatients = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const options = pickQuery(req.query, [
      'limit',
      'page',
      'search',
      'sortBy',
      'sortOrder',
    ]);

    const filters = pickQuery(req.query, ['email', 'contactNumber']);
    const data = await patientServices.getAllPatients(filters, options);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Patients Retrived Successfully',
      data: data.data,
      metaData: data.metaData,
    });
  }
);

const getSinglePatient = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await patientServices.getSinglePatient(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Patient Retrived Successfully',
      data,
    });
  }
);

const updatePatient = createAsyncFn(
  async (
    req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;
    const data = await patientServices.updatePatient(user as IJWTPayload, req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Patient Updated Successfully',
      data,
    });
  }
);

const updateAndCreatePatient = createAsyncFn(
  async (
    req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const data = await patientServices.updateAndCreatePatient(
      req.user as IJWTPayload,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Patient Updated Successfully',
      data,
    });
  }
);

export const patientController = {
  getAllPatients,
  getSinglePatient,
  updatePatient,
  updateAndCreatePatient,
};
