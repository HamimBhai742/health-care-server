import { JwtPayload, SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

interface IPayload {
  userId: string;
  email: string;
  role: string;
}
export const createJwtToken = (
  payload: IPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

export const verifyJwtToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
