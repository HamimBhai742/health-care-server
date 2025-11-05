export interface IOptions {
  page?: string;
  limit?: string;
  search?: string;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface IPagination {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

export interface IUserRequest {
  userId: string;
  email: string;
  role: 'DOCTOR';
  iat: number;
  exp: number;
}

export interface DoctorSchedulePayload {
  scheduleIds: string[];
}

export interface IJWTPayload {
  userId: string;
  email: string;
  role: string;
}
