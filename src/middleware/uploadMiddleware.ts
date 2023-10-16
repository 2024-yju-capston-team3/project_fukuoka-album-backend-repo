import multer, { diskStorage } from "multer";
import fs from "fs";
import { UnprocessableEntityException } from "../util/exception";
import { generate } from "shortid";
const supportedMediaType = ["jpg", "jpeg", "png"];

const upload = multer({
	fileFilter: (req, file, callback) => {
		const fileType = file.mimetype.split("/")[1];

		const isSupportedMediaType = supportedMediaType.includes(fileType);

		if (isSupportedMediaType) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	storage: diskStorage({
		destination: (req, file, callback) => {
			const area = req.params?.area;
			const directory = `../project_fukuoka-album-deployment-repo/public/img/${area}`;

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
			const fileId = generate();
			const fileName = `${fileId}`;

			callback(null, fileName);
		},
	}),
});

export const singleUpload = upload.single("image");
