import { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../util/asyncWrapper";
import { HttpException } from "../util/response";
import { verify } from "../controller/auth";

export const authMiddleware = (isRefresh?: boolean) =>
	asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
		const token = isRefresh
			? req.body?.authorization
			: req.headers?.authorization;

		if (!token) {
			throw new HttpException(422, "인증할 수 없습니다.");
		}

		verify(token, isRefresh);

		next();
	});
