import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { prescriptionServices } from './prescription.services';
import { IJWTPayload } from '../../types/interface';
import { pickQuery } from '../../utils/pick.query';

const createPrescription = createAsyncFn(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user as IJWTPayload;
    const data = await prescriptionServices.createPrescription(user, req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Prescription Created Successfully',
      data,
    });
  }
);

const getMyPrescription = createAsyncFn(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user as IJWTPayload;
    const options = pickQuery(req.query, [
      'limit',
      'page',
      'search',
      'sortBy',
      'sortOrder',
    ]);

    const filters = pickQuery(req.query, ['patientId', 'doctorId']);
    const data = await prescriptionServices.getMyPrescriptions(
      user,
      filters,
      options
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Prescription Retrived Successfully',
      data,
    });
  }
);

export const prescriptionController = {
  createPrescription,
  getMyPrescription,
};
