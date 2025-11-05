import { IOptions, IPagination } from "../types/interface";

export const pagination = (options: IOptions): IPagination => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return { page, limit, skip, sortBy, sortOrder };
};
