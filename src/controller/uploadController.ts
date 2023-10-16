import { InternalServerErrorException } from "../util/exception";
import { fetchToDB } from "../util/jsonServerRequest";
import { Created } from "../util/response";
import fs from "fs";

const TIME_SET = 1 * 60 * 60 * 1000;

/** 임시 저장소 저장 */
export const storeTempImage = async (tempPath: string) => {
	try {
		const res = await fetchToDB("POST", "tempImage", {
			path: tempPath,
		});

		const {
			path,
			id,
		}: {
			path: string;
			id: number;
		} = await res.json();

		// 체크 및 삭제
		asyncDelete(path, id);

		// 경로 리턴
		return Created("이미지 저장 완료", { path, id });
	} catch (error) {
		console.log(error);
		throw new InternalServerErrorException();
	}
};

/** 사용되지 않은 image 삭제 */
const asyncDelete = async (path: string, id: number) => {
	try {
		setTimeout(async () => {
			const response = await fetchToDB("GET", `tempImage?path=${path}`);

			// 이미지가 tempImage 테이블 안에 있는 경우 스토리지에서 삭제
			if (response.ok) {
				deleteImagefromStorage([path]);
			}

			// table 삭제
			const responseAfter1Hours = await fetchToDB("DELETE", `tempImage/${id}`);

			if (responseAfter1Hours.ok) {
				console.log(`이미지 (${path}) 삭제 완료`);
			} else {
				console.log(`이미지 (${path})를 찾을 수 없습니다.`);
			}
		}, TIME_SET);
	} catch (error) {
		console.error("오류 발생:", error);
	}
};

/** 스토리지 삭제 */
const deleteImagefromStorage = (paths: string[]) => {
	paths.forEach((path) => {
		try {
			fs.unlinkSync(`${path}`);
		} catch (error) {
			console.log(error);
		}
	});
};
