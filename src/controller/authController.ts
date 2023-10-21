import { JWT } from "../module/jwt";
import { Request } from "express";
import { Created, CustomResponse } from "../util/response";
import {
	InternalServerErrorException,
	UnprocessableEntityException,
} from "../util/exception";
import { fetchToDB } from "../util/jsonServerRequest";

interface GoogleUser {
	email: string;
	name: string;
	imageUrl: string;
	picture: string;
}

// 디코딩 해 유저 정보 가져오기
const decodeBase64 = (credential: string) => {
	const base64Payload = credential.split(".")[1];
	const payloadBuffer = Buffer.from(base64Payload, "base64");
	const updatedJwtPayload = JSON.parse(payloadBuffer.toString());
	return updatedJwtPayload;
};

// 가져온 유저 정보 조회 - 이메일 값 이용
const getUser = async (googleUser: GoogleUser) => {
	const email = googleUser.email;
	const response = await fetch(`http://localhost:3004/user?email=${email}`, {
		headers: { "Content-Type": "application/json" },
	});
	let user = await response.json();
	user = user[0];
	// 없으면 생성후 유저 정보 가져오기
	if (!user) {
		const response = await fetch(`http://localhost:3004/user/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: googleUser.email,
				name: googleUser.name,
				comment: `안녕하세요 ${googleUser.name} 입니다.`,
				imageUrl: googleUser.picture,
			}),
		});

		user = await response.json();
	}

	const id = user.id;

	const userInfo = await fetch(`http://localhost:3004/user/${id}`);

	user = await userInfo.json();

	return user;
};

/** 구글 유저 정보를 이용해 jwt 발급 */
export const signIn = async (
	credential: string | undefined
): Promise<CustomResponse> => {
	if (!credential) {
		throw new UnprocessableEntityException("토큰이 없습니다.");
	}
	try {
		// 유저 정보 가져오기
		const googleUser = decodeBase64(credential);
		const user = await getUser(googleUser);

		const token = await JWT.sign(user.email);

		return Created({ ...user, token });
	} catch (error) {
		console.log(error);
		throw new InternalServerErrorException();
	}
};

export const refresh = async (email: string): Promise<CustomResponse> => {
	const newAccessToken = await JWT.sign(email, true);

	return Created(newAccessToken);
};
