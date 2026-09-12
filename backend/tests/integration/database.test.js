import { afterAll, afterEach, describe, expect, it } from 'vitest';
import { prisma } from '../../lib/prisma';
import { cleanupDatabase } from '../helpers/cleanup';

describe('Database Connection', () => {
  it('should connect to the test database', async () => {
    const result = await prisma.$queryRaw`SELECT 1`;
    expect(result).toBeDefined();
  });
});

afterEach(async () => {
  await cleanupDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});
