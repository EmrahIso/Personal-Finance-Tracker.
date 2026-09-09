import { prisma } from '../../src/lib/prisma.js';

export const cleanupDatabase = async () => {
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
};
