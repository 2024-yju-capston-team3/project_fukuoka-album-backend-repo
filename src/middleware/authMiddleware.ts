import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../util/asyncWrapper";
import { UnprocessableEntityException } from "../util/exception";
import { verify } from "../controller/authController";

export const authMiddleware = (isRefresh?: boolean) =>
	asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
		const token = isRefresh
			? req.body?.authorization
			: req.headers?.authorization;

		if (!token) {
			throw new UnprocessableEntityException("토큰이 없습니다.");
		}

		verify(token, isRefresh);

		next();
	});
