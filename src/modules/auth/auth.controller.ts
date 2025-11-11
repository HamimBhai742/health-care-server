import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';
import { authServices } from './auth.services';
import { setCookies } from '../../utils/set.cookies';
import { IJWTPayload } from '../../types/interface';
import { logOutFn } from '../../utils/logout';

const login = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await authServices.login(req.body);
    setCookies(res, data.token);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Login Successfully',
      data: {
        needPassChange: data.needPassChange,
      },
    });
  }
);

const getNewAccessToken = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await authServices.getNewAccessToken(req.body.refreshToken);
    setCookies(res, data);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Login Successfully',
      data,
    });
  }
);

const changePassword = createAsyncFn(
  async (
    req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const data = await authServices.changePassword(
      req.user as IJWTPayload,
      req.body.oldPassword,
      req.body.newPassword
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Password Changed Successfully',
      data: null,
    });
  }
);

const forgetPassword = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await authServices.forgetPassword(req.body.email);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Reset Link Sent Successfully',
      data: null,
    });
  }
);

const resetPassword = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await authServices.resetPassword(
      req.params.token,
      req.params.id,
      req.body.newPassword
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Password Changed Successfully',
      data: null,
    });
  }
);

const logOut = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    logOutFn(res, req.cookies);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Logout Successfully',
      data: null,
    });
  }
);

const getMe = createAsyncFn(async (req: Request, res: Response) => {
  const data = await authServices.getMe(req.cookies);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: 'User Retrived Successfully',
    data,
  });
});
export const authController = {
  login,
  getNewAccessToken,
  changePassword,
  forgetPassword,
  resetPassword,
  logOut,
  getMe,
};
