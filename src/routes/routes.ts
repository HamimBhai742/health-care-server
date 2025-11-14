import { Router } from 'express';
import { userRouter } from '../modules/user/user.routes';
import { authRouter } from '../modules/auth/auth.routes';
import { scheduleRouter } from '../modules/schedule/schedule.routes';
import { doctorScheduleRouter } from '../modules/doctorSchedule/doctor.routes';
import { specialtiesRouter } from '../modules/specialties/specialties.routes';
import { doctorRouter } from '../modules/doctor/doctor.routes';
import { patientRouter } from '../modules/patient/patient.routes';
import { appoinmentRouter } from '../modules/appoinment/appoinment.routes';
import { prescriptionRouter } from '../modules/prescription/prescription.routes';
import { reviewRouter } from '../modules/review/review.routes';
import { metaRouter } from '../modules/meta/meta.routes';

export const router = Router();

const routes = [
  {
    path: '/schedule',
    router: scheduleRouter,
  },
  {
    path: '/user',
    router: userRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/doctor-schedule',
    router: doctorScheduleRouter,
  },
  {
    path: '/specialties',
    router: specialtiesRouter,
  },
  {
    path: '/doctor',
    router: doctorRouter,
  },
  {
    path: '/patient',
    router: patientRouter,
  },
  {
    path: '/appoinment',
    router: appoinmentRouter,
  },
  {
    path: '/prescription',
    router: prescriptionRouter,
  },
  {
    path: '/review',
    router: reviewRouter,
  },
  {
    path: '/meta-data',
    router: metaRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});
