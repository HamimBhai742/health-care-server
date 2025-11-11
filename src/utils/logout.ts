import { Response } from 'express';

interface IToken {
  accessToken?: string;
  refreshToken?: string;
}
export const logOutFn = (res: Response, userToekn: IToken) => {
  if (userToekn?.accessToken) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }
  if (userToekn?.refreshToken) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }
};
