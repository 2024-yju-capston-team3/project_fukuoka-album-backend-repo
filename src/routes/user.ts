import express, { Request, Response } from "express";
import { deleteImagefromStorage } from "../controller/uploadController";
import { asyncWrapper } from "../util/asyncWrapper";
import { getUser, update } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

export const User = () => {
	router.get(
		"/:id",
		authMiddleware(),
		asyncWrapper(async (req: Request, res: Response) => {
			const id = Number(req.params?.id);

			const result = await getUser(id);

			res.status(result.statusCode).json(result.data);
		})
	);

	router.put(
		"/update",
		authMiddleware(),
		asyncWrapper(async (req: Request, res: Response) => {
			const { user, prevImage } = req.body;

			if (prevImage) {
				deleteImagefromStorage([prevImage]);
			}

			const result = await update(user);

			res.status(result.statusCode).json(result?.data);
		})
	);

	return router;
};
