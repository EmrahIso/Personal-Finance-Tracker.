import { beforeEach, describe, expect, it, vi } from 'vitest';
import requireAuth from '../../../src/middlewares/requireAuth.js';

describe('requireAuth Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      session: {},
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    next = vi.fn();
  });

  it('should return 401 if user is not authenticated', () => {
    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Authentication required.',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user is authenticated', () => {
    req.session.userId = 1;

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
