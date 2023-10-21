import express, { Request, Response } from "express";
import { refresh, signIn } from "../controller/authController";
import {
	accessMiddleware,
	refreshMiddleware,
} from "../middleware/authMiddleware";
import { asyncWrapper } from "../util/asyncWrapper";

const router = express.Router();

export const Auth = () => {
	router.post(
		"/",
		asyncWrapper(async (req: Request, res: Response) => {
			const credential = req.body.userInfo;

			const result = await signIn(credential);

			res.status(result.statusCode).json(result);
		})
	);

	router.post(
		"/refresh",
		refreshMiddleware,
		asyncWrapper(async (req: Request, res: Response) => {
			const { userInfo } = req.body;
			const result = await refresh(userInfo);

			res.status(result.statusCode).json(result.data);
		})
	);

	return router;
};
