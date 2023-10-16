import {
	InternalServerErrorException,
	UnprocessableEntityException,
} from "../util/exception";
import { fetchToDB } from "../util/jsonServerRequest";
import { Created, OK } from "../util/response";

interface User {
	id: number;
	email: string;
	name: string;
	comment: string;
	imageUrl: string;
}

export const getUser = async (id: number) => {
	if (!id) {
		throw new UnprocessableEntityException();
	}
	const res = await fetchToDB("GET", `user/${id}`);

	if (!res.ok) {
		throw new InternalServerErrorException();
	}

	const data = await res.json();

	return OK("", data);
};
// 사진 등록

/** 사진 업데이트
 * 1. 유저 새로운 사진에 실제 경로 더해서 업데이트
 * 2. 기존 이미지 경로로 스토리지 삭제
 * 2. 있으면 지운다.
 */
export const update = async (user: User) => {
	if (!user) {
		throw new UnprocessableEntityException();
	}

	const res = await fetchToDB("PUT", `user/${user.id}`, user);

	if (!res.ok) {
		throw new InternalServerErrorException();
	}

	const data = await res.json();

	return Created("유저 수정 성공", data);
};
//

// 자기 소개 수정

// 닉네임 수정?
