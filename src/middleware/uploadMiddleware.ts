import multer, { diskStorage } from "multer";
import fs from "fs";
import { UnprocessableEntityException } from "../util/exception";

const upload = multer({
	storage: diskStorage({
		destination: (req, file, callback) => {
			const area = req.params?.area;
			const directory = `../uploads/${area}`;

			if (!area) {
				throw new UnprocessableEntityException("area 값이 없습니다.");
			}

			// 디렉터리가 존재하지 않으면 생성
			if (!fs.existsSync(directory)) {
				fs.mkdirSync(directory, { recursive: true });
			}

			callback(null, directory);
		},
		filename: (req, file, callback) => {
			const date = new Date();

			const fileName = `${date.getUTCFullYear()}${
				date.getUTCMonth() + 1
			}${date.getUTCDate()}${date.getHours()}${date.getUTCMinutes()}${
				file.originalname
			}`;

			callback(null, fileName);
		},
	}),
});

export const singleUpload = upload.single("image");
