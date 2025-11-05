import { Gender } from '@prisma/client';

export interface IDoctor {
  name: string;
  contactNumber: string;
  designation: string;
  qualification: string;
  registrationNumber: string;
  currentWorkplace: string;
  experience: number;
  address: string;
  gender: Gender;
  apointmentFee: number;
  specialties: {
    specialtiyId: string;
    isDeleted?: boolean;
  }[];
}
