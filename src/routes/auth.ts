import express, { Request, Response } from "express";
import { refresh, signIn } from "../controller/auth";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

export const Auth = () => {
	router.post("/", async (req: Request, res: Response) => {
		const credential = req.body.userInfo;

		const result = await signIn(credential);

		res.status(result.statusCode).json(result);
	});

	router.get(
		"/verify",
		authMiddleware(),
		async (req: Request, res: Response) => {
			res.status(200).json("OK");
		}
	);

	router.post(
		"/refresh",
		authMiddleware(true),
		async (req: Request, res: Response) => {
			const result = await refresh(req);

			res.status(result.statusCode).json(result.data);
		}
	);

	return router;
};
