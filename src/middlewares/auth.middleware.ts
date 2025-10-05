import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { EffectiveMobileRequest } from '../interfaces/user.interface';
import { JwtPayload } from '../interfaces/auth.interface';
import { UserRoles } from '../models/user.model';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;

    (req as EffectiveMobileRequest).user = { id: decoded.id, role: decoded.role };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as EffectiveMobileRequest;

  if (!user) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  if (user.role !== UserRoles.ADMIN) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};

export const requireSelfOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as EffectiveMobileRequest;

  if (!user) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  if (user.role !== UserRoles.ADMIN && user.id !== req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};
