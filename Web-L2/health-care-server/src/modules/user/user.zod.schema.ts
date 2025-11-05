import z from 'zod';

export const createPatientZodeSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string(),
    email: z.email(),
    address: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

export const createDoctorZodeSchema = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string(),
    email: z.email(),
    contactNumber: z.string(),
    address: z.string(),
    designation: z.string(),
    currentWorkplace: z.string(),
    apointmentFee: z.number(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    qualification: z.string(),
    registrationNumber: z.string(),
  }),
});

export const createAdminZodeSchema = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string(),
    email: z.email(),
  }),
});
