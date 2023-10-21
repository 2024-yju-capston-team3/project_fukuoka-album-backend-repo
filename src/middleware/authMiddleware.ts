import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../util/asyncWrapper";
import { UnprocessableEntityException } from "../util/exception";
import { JWT } from "../module/jwt";

export const accessMiddleware = asyncWrapper(
	(req: Request, res: Response, next: NextFunction) => {
		const token = req.headers?.authorization;

		if (!token) {
			throw new UnprocessableEntityException("토큰이 없습니다.");
		}

		JWT.verify(token);

		next();
	}
);

export const refreshMiddleware = asyncWrapper(
	(req: Request, res: Response, next: NextFunction) => {
		const token = req.body?.authorization;

		if (!token) {
			throw new UnprocessableEntityException("토큰이 없습니다.");
		}

		JWT.refreshVerify(token);

		next();
	}
);
