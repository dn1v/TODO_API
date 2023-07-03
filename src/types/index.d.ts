import { PrismaClient, User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      token?: string
    }
  }
}