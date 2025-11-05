import { Request } from 'express';
import { fileUploader } from '../../utils/multer';
import { prisma } from '../../config/prisma.config';
import { Specialties } from '@prisma/client';

const createSpecialties = async (req: Request) => {
  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }
  console.log(req.body);
  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

const getAllSpecialties = async (): Promise<Specialties[]> => {
  return await prisma.specialties.findMany();
};

const deleteSpecialties = async (id: string): Promise<Specialties> => {
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });
  return result;
};

export const specialtiesService = {
  createSpecialties,
  getAllSpecialties,
  deleteSpecialties,
};
