import { Response } from 'express';
import { ENV } from '../config/env';

interface IToken {
  accessToken?: string;
  refreshToken?: string;
}
export const setCookies = (res: Response, token: IToken) => {
  if (token?.accessToken) {
    res.cookie('accessToken', token.accessToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
    });
  }

  if (token?.refreshToken) {
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
    });
  }
};
