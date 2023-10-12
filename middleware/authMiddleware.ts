import { Request, Response, NextFunction } from 'express';
import { asyncWrapper } from '../util/asyncWrapper';
import { HttpException } from '../util/response';
import { verify } from '../controller/auth';

export const authMiddleware = (isRefresh?: boolean) =>
  asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const token = isRefresh ? req.body?.authorization : req.headers?.authorization;
    
    if (!token) {
      throw new HttpException(422, '인증할 수 없습니다.');
    }
    
    const isVerify = verify(token, isRefresh);
    
    if (!isVerify) {
      throw new HttpException(401, '사용자 권한이 없습니다.');
    }

    next();
  });
;