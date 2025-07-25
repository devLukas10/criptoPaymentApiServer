// src/middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const {_JWT_SECRETE_KEY} = process.env;

const _SECRETE = _JWT_SECRETE_KEY || 'demo_secrete';


export const generateToken = (payload: object): string => {
  return jwt.sign(payload, _SECRETE);
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): any{
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token ausente.' });
  const token: string = authHeader.split(' ')[1] || "";
  try {
    const decoded = jwt.verify(token, _SECRETE) as any;
    req.body = decoded;
    next();
  } catch(err)  {
    throw err
  }
}
