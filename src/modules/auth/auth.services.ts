import { UserStatus } from '@prisma/client';
import { prisma } from '../../config/prisma.config';
import { AppError } from '../../error/coustome.error';
import httpStatusCode from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { createNewAccessToken, createUserToken } from '../../utils/create.jwt';
import { IJWTPayload } from '../../types/interface';
import { ENV } from '../../config/env';
import { createJwtToken, verifyJwtToken } from '../../utils/create.token';
import { sendEmail } from '../../utils/sendEmail';
const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!user) {
    throw new AppError('User not found', httpStatusCode.NOT_FOUND);
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new AppError('Password does not match', httpStatusCode.UNAUTHORIZED);
  }

  const token = createUserToken(user);
  return {
    needPassChange: user.newChnagePass,
    token,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const ok = createNewAccessToken(refreshToken);
  return ok;
};

const changePassword = async (
  user: IJWTPayload,
  oldPassword: string,
  newPassword: string
) => {
  const fiUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!fiUser) {
    throw new AppError('User not found', httpStatusCode.NOT_FOUND);
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, fiUser.password);

  if (!isPasswordMatch) {
    throw new AppError('Password does not match', httpStatusCode.UNAUTHORIZED);
  }

  const hashPass = await bcrypt.hash(newPassword, ENV.BCRYPT_SALT);

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashPass,
      newChnagePass: false,
    },
  });
};

const forgetPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError('User not found', httpStatusCode.NOT_FOUND);
  }

  if (
    user.status === UserStatus.INACTIVE ||
    user.status === UserStatus.DELETE
  ) {
    throw new AppError(`User is ${user.status}`, httpStatusCode.NOT_ACCEPTABLE);
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const token = createJwtToken(
    jwtPayload,
    ENV.JWT_SECRET,
    ENV.RESET_TOKEN_EXPIRE_IN
  );
  const resetUrl = `${ENV.CLIENT_URL}/reset-password?token=${token}&id=${user.id}`;
  sendEmail({
    to: user.email,
    subject: 'Reset Password',
    templateName: 'forgetPassword',
    templateData: {
      name: 'Hamim',
      resetUrl,
    },
  });
};

const resetPassword = async (
  token: string,
  id: string,
  newPassword: string
) => {
  if (!token) {
    throw new AppError('Token is missing', httpStatusCode.BAD_REQUEST);
  }
  const decode = verifyJwtToken(token, ENV.JWT_SECRET);

  if (!decode) {
    throw new AppError('Token is invalid', httpStatusCode.BAD_REQUEST);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: decode.email,
    },
  });

  if (!user || user.id !== id) {
    throw new AppError('User not found', httpStatusCode.NOT_FOUND);
  }
  const hashPass = await bcrypt.hash(newPassword, ENV.BCRYPT_SALT);
  await prisma.user.update({
    where: {
      email: decode.email,
    },
    data: {
      password: hashPass,
      newChnagePass: false,
    },
  });
};

export const authServices = {
  login,
  getNewAccessToken,
  changePassword,
  forgetPassword,
  resetPassword
};
