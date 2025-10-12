import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private verifyToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return { success: false, message: 'Unauthorized' };
    }
    return { success: true, decoded };
  }

  use(req: Request, res: Response, next: () => void) {
    const token = req.cookies?.token;
    if (!token) {
      return res.json({ success: false, message: 'No token found' });
    }
    const result = this.verifyToken(token);
    if (!result.success) {
      return res.json(result);
    }
    next();
  }
}
