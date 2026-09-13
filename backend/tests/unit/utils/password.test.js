import { describe, it, expect } from 'vitest';
import { generatePassword, validatePassword } from '../../../utils/password.js';

describe('Password Utils', () => {
  describe('generatePassword', () => {
    it('should generate a valid password hash', async () => {
      const password = 'testPassword123!';
      const hash = await generatePassword(password);

      expect(hash).not.toBe(password);
      expect(await validatePassword(password, hash)).toBe(true);
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'testPassword123!';

      const hash1 = await generatePassword(password);
      const hash2 = await generatePassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('validatePassword', () => {
    it('should return true for correct password', async () => {
      const password = 'testPassword123!';
      const hash = await generatePassword(password);

      expect(await validatePassword(password, hash)).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const password = 'testPassword123!';
      const hash = await generatePassword(password);

      expect(await validatePassword('wrongPassword123!', hash)).toBe(false);
    });
  });
});
