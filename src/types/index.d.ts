import { PrismaClient, User } from '@prisma/client';
import { UserNonSensitiveData } from '../interfaces/noSensitiveData.interface';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      token?: string;
      tasks?: any;
    }
  }
}