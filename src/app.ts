import express, { Application, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { router } from './routes/routes';
import { globalErrorHandel } from './middleware/globalErrorHandel';
import { notFound } from './middleware/notFound';
import cookieParser from 'cookie-parser';
import { paymentController } from './modules/payment/payment.controller';
import cron from 'node-cron';
import { appoinmentServices } from './modules/appoinment/appoinment.services';
export const app: Application = express();

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.handelPaymentEvent
);

app.use(cookieParser());
app.use(urlencoded());
app.use(express.json());

app.use(
  cors({
    origin: [],
  })
);

app.use('/api/v1', router);

cron.schedule('* * * * *', async () => {
  try {
    console.log('running a task every minute', new Date());
    await appoinmentServices.cancelUnpaidAppoinments();
  } catch (error) {
    console.log(error);
  }
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Health Care Server Is Running............',
    enviroment: ENV.NODE_ENV,
    uptime: process.uptime().toFixed(2) + 's',
  });
});

app.use(globalErrorHandel);

app.use(notFound);
