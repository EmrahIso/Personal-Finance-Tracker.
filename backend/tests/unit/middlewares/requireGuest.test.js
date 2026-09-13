import { describe, it, expect, beforeEach, vi } from 'vitest';
import requireGuest from '../../../src/middlewares/requireGuest.js';

describe('requireGuest Middleware', () => {
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

  it('should return 403 if user is already logged in', () => {
    req.session.userId = 1;

    requireGuest(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'You are already logged in.',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user is not logged in', () => {
    requireGuest(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
