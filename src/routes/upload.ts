import express, { Request, Response } from "express";
import { singleUpload } from "../middleware/uploadMiddleware";
import { storeTempImage } from "../controller/uploadController";

const router = express.Router();

export const Upload = () => {
	router.post("/:area", singleUpload, async (req: Request, res: Response) => {
		const image = `${req.file?.destination}/${req.file?.filename}`;

		const result = await storeTempImage(image);

		res.status(result.statusCode).json(result?.data);
	});

	return router;
};
