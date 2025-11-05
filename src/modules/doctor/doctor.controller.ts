import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { doctorServices } from './doctor.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';
import { pickQuery } from '../../utils/pick.query';

const getAllDoctors = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const options = pickQuery(req.query, [
      'limit',
      'page',
      'search',
      'sortBy',
      'sortOrder',
    ]);

    const filters = pickQuery(req.query, [
      'email',
      'contactNumber',
      'designation',
      'apointmentFee',
      'gender',
      'registrationNumber',
      'specialties'
    ]);
    const data = await doctorServices.getAllDoctors(filters, options);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Doctors Retrived Successfully',
      data,
    });
  }
);

const getSingleDoctor = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {

    const data = await doctorServices.getSingleDoctor(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Doctor Retrived Successfully',
      data,
    });
  }
)

const updateDoctor = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await doctorServices.updateDoctor(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Doctor Updated Successfully',
      data,
    });
  }
);


const getDoctorSuggestions = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await doctorServices.getDoctorSuggestions(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Suggestions Retrived Successfully',
      data,
    });
  }
)

const deleteDoctor = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await doctorServices.deleteDoctor(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Doctor Deleted Successfully',
      data,
    });
  }
);




export const doctorController = {
  getAllDoctors,
  updateDoctor,
  getSingleDoctor,
  deleteDoctor,
  getDoctorSuggestions
};
