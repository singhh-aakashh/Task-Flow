import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

// Create a new Prisma client instance and extend with Accelerate
export const db =  new PrismaClient().$extends(withAccelerate());
