import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { stripe } from '../../utils/stripe';
import Stripe from 'stripe';
import { paymentServices } from './payment.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';
import { AppError } from '../../error/coustome.error';
import { ENV } from '../../config/env';

const handelPaymentEvent = createAsyncFn(
  async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret =ENV.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
    } catch (err: any) {
      console.error(`⚠️ Webhook signature verification failed.`, err.message);
      throw new AppError(err.message, httpStatusCode.BAD_REQUEST);
    }

    const data = await paymentServices.handelPaymentEvent(event);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Payment Retrived Successfully',
      data,
    });
  }
);

export const paymentController = {
  handelPaymentEvent,
};
