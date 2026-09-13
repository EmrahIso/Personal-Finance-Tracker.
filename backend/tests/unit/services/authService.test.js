import { beforeEach, describe, expect, it, vi } from 'vitest';

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

vi.mock('../../../lib/prisma.js', () => ({
  prisma: prismaMock,
}));

const { default: authService } =
  await import('../../../src/services/authService.js');

describe('authService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('isEmailTaken', () => {
    it('should throw INVALID_INPUT if email is missing', async () => {
      await expect(authService.isEmailTaken({})).rejects.toMatchObject({
        statusCode: 400,
        code: 'INVALID_INPUT',
        message: 'email is required!',
      });

      expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
    });

    it('should return true if email is already taken', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'user-id-1',
        email: 'test@example.com',
      });

      const result = await authService.isEmailTaken({
        email: 'test@example.com',
      });

      expect(result).toBe(true);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: 'test@example.com',
        },
      });
    });

    it('should return false if email is not taken', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await authService.isEmailTaken({
        email: 'test@example.com',
      });

      expect(result).toBe(false);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: 'test@example.com',
        },
      });
    });
  });

  describe('createUser', () => {
    it('should throw INVALID_INPUT if email is missing', async () => {
      await expect(
        authService.createUser({
          passwordHash: 'hashed-password',
        })
      ).rejects.toMatchObject({
        statusCode: 400,
        code: 'INVALID_INPUT',
        message: 'email is required!',
      });

      expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });

    it('should throw INVALID_INPUT if passwordHash is missing', async () => {
      await expect(
        authService.createUser({
          email: 'test@example.com',
        })
      ).rejects.toMatchObject({
        statusCode: 400,
        code: 'INVALID_INPUT',
        message: 'passwordHash is required!',
      });

      expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });

    it('should throw EMAIL_ALREADY_EXISTS if email is already taken', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'user-id-1',
        email: 'test@example.com',
      });

      await expect(
        authService.createUser({
          email: 'test@example.com',
          passwordHash: 'hashed-password',
        })
      ).rejects.toMatchObject({
        statusCode: 409,
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'Email already exists.',
      });

      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });

    it('should create and return a user if email is available', async () => {
      const createdUser = {
        id: 'user-id-1',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
        isGuest: false,
      };

      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue(createdUser);

      const result = await authService.createUser({
        email: 'test@example.com',
        passwordHash: 'hashed-password',
      });

      expect(result).toEqual(createdUser);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: 'test@example.com',
        },
      });

      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          passwordHash: 'hashed-password',
        },
      });
    });
  });

  describe('createGuestUser', () => {
    it('should create and return a guest user', async () => {
      const createdGuest = {
        id: 'guest-id-1',
        email: 'guest-test@example.local',
        passwordHash: '',
        isGuest: true,
      };

      prismaMock.user.create.mockResolvedValue(createdGuest);

      const result = await authService.createGuestUser();

      expect(result).toEqual(createdGuest);

      expect(prismaMock.user.create).toHaveBeenCalledTimes(1);

      const createCall = prismaMock.user.create.mock.calls[0][0];

      expect(createCall.data.passwordHash).toBe('');
      expect(createCall.data.isGuest).toBe(true);
      expect(createCall.data.email).toMatch(
        /^guest-[a-f0-9-]+@example\.local$/
      );
    });
  });

  describe('getUserByEmail', () => {
    it('should throw INVALID_INPUT if email is missing', async () => {
      await expect(authService.getUserByEmail({})).rejects.toMatchObject({
        statusCode: 400,
        code: 'INVALID_INPUT',
        message: 'email is required!',
      });

      expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
    });

    it('should return the user if found', async () => {
      const user = {
        id: 'user-id-1',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
      };

      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await authService.getUserByEmail({
        email: 'test@example.com',
      });

      expect(result).toEqual(user);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: 'test@example.com',
        },
      });
    });

    it('should throw USER_NOT_FOUND if user does not exist', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.getUserByEmail({
          email: 'test@example.com',
        })
      ).rejects.toMatchObject({
        statusCode: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found.',
      });
    });
  });

  describe('getUserById', () => {
    it('should throw INVALID_INPUT if id is missing', async () => {
      await expect(authService.getUserById({})).rejects.toMatchObject({
        statusCode: 400,
        code: 'INVALID_INPUT',
        message: 'id is required!',
      });

      expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
    });

    it('should return the user if found', async () => {
      const user = {
        id: 'user-id-1',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isGuest: false,
      };

      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await authService.getUserById({
        id: 'user-id-1',
      });

      expect(result).toEqual(user);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'user-id-1',
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          isGuest: true,
        },
      });
    });

    it('should throw USER_NOT_FOUND if user does not exist', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.getUserById({
          id: 'non-existent-id',
        })
      ).rejects.toMatchObject({
        statusCode: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found.',
      });
    });
  });

  describe('deleteUserById', () => {
    it('should throw INVALID_INPUT if id is missing', async () => {
      await expect(authService.deleteUserById({})).rejects.toMatchObject({
        statusCode: 400,
        code: 'INVALID_INPUT',
        message: 'id is required!',
      });

      expect(prismaMock.user.delete).not.toHaveBeenCalled();
    });

    it('should delete an existing user', async () => {
      const user = {
        id: 'user-id-1',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isGuest: false,
      };

      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.user.delete.mockResolvedValue(user);

      await authService.deleteUserById({
        id: 'user-id-1',
      });

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'user-id-1',
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          isGuest: true,
        },
      });

      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: {
          id: 'user-id-1',
        },
      });
    });

    it('should not delete the user if it does not exist', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.deleteUserById({
          id: 'non-existent-id',
        })
      ).rejects.toMatchObject({
        statusCode: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found.',
      });

      expect(prismaMock.user.delete).not.toHaveBeenCalled();
    });
  });
});
