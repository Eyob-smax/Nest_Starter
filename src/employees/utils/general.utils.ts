import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
@Injectable()
export class Utils {
  public verifyToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return { success: false, message: 'Unauthorized' };
    }
    return { success: true, decoded };
  }
}
