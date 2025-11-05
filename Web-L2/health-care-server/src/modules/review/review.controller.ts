import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { IJWTPayload } from '../../types/interface';
import { sendResponse } from '../../utils/send.response';
import { reviewServices } from './review.services';

const createReview = createAsyncFn(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const data = await reviewServices.createReview(
      req.user as IJWTPayload,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Rating Created Successfully',
      data,
    });
  }
);

export const reviewController = {
  createReview,
};
