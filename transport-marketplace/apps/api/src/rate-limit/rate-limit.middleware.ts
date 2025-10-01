import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  keyGenerator: req => req.ip,
  message: 'Too many login attempts. Try again later.',
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  keyGenerator: req => req.ip,
  message: 'Too many registrations. Try again later.',
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  keyGenerator: req => req.user?.id || req.ip,
  message: 'Too many requests. Try again later.',
});

export const uploadLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  keyGenerator: req => req.user?.id || req.ip,
  message: 'Too many uploads. Try again later.',
});
