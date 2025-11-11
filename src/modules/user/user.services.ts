import { prisma } from '../../config/prisma.config';
import bcrypt from 'bcryptjs';
import { ENV } from '../../config/env';
import { Request } from 'express';
import { fileUploader } from '../../utils/multer';
import { pagination } from '../../utils/pagination';
import { userSearchFileds } from './user.constain';
import { Prisma } from '@prisma/client';
import httpStatusCode from 'http-status-codes';
import { IJWTPayload } from '../../types/interface';
import { AppError } from '../../error/coustome.error';

const createPatient = async (req: Request) => {
  if (req.file) {
    const img = await fileUploader.uploadToCloudinary(req.file);
    req.body.patient.profilePhoto = img.secure_url;
  }
  const hashPass = await bcrypt.hash(req.body.password, ENV.BCRYPT_SALT);
  const patient = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashPass,
      },
    });
    return await tx.patient.create({
      data: req.body.patient,
    });
  });
  return patient;
};

const createDoctor = async (req: Request) => {
  if (req.file) {
    const img = await fileUploader.uploadToCloudinary(req.file);
    req.body.doctor.profilePhoto = img.secure_url;
  }
  const hashPass = await bcrypt.hash(req.body.password, ENV.BCRYPT_SALT);
  const doctor = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        email: req.body.doctor.email,
        password: hashPass,
        role: 'DOCTOR',
      },
    });
    return await tx.doctor.create({
      data: req.body.doctor,
    });
  });
  return doctor;
};

const createAdmin = async (req: Request) => {
  if (req.file) {
    const img = await fileUploader.uploadToCloudinary(req.file);
    req.body.admin.profilePhoto = img.secure_url;
  }
  const hashPass = await bcrypt.hash(req.body.password, ENV.BCRYPT_SALT);
  const admin = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        email: req.body.admin.email,
        password: hashPass,
        role: 'ADMIN',
      },
    });
    return await tx.admin.create({
      data: req.body.admin,
    });
  });
  return admin;
};

const getAllUser = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { search } = options;

  const searchTerm = userSearchFileds.map((field) => ({
    [field]: {
      contains: search,
      mode: 'insensitive',
    },
  }));

  console.log(searchTerm);

  const where: any = {
    AND: [
      filters && Object.keys(filters).length ? filters : undefined,
      search && { OR: searchTerm },
    ].filter(Boolean),
  };

  console.log(where);

  const user = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where,
  });
  return {
    user,
    metaData: {
      total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getMe = async (payload: IJWTPayload) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: 'ACTIVE',

    },select: {
      email: true,
      role: true,
      doctor: true,
    }
  });
  if (!user) {
    throw new AppError('User not found', httpStatusCode.NOT_FOUND);
  }

  // let patientData=[]

  // if()
  const patient = await prisma.patient.findUnique({
    where: {
      email: user.email,
    },
  });

  return {
    ...user,
    ...patient,
  };
};

export const userServices = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUser,
  getMe,
};
