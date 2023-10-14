import jwt, { TokenExpiredError } from "jsonwebtoken";
import {
	AccessSecretKey,
	RefreshSecretKey,
	AccessTokenoption,
	RefreshTokenoption,
} from "../config/secretkey";
import { HttpException } from "../util/response";

export const JWT = {
	/** 토큰 발급 */
	sign: async (email: string, isRefresh?: boolean) => {
		const payload = {
			email,
		};

		if (isRefresh) {
			return {
				accessToken: jwt.sign(payload, AccessSecretKey, AccessTokenoption),
			};
		}

		const token = {
			accessToken: jwt.sign(payload, AccessSecretKey, AccessTokenoption),
			refreshToken: jwt.sign(payload, RefreshSecretKey, RefreshTokenoption),
		};

		return token;
	},

	/** 토큰 인증 */
	verify: (token: string, isRefresh?: boolean) => {
		const secretKey = isRefresh ? RefreshSecretKey : AccessSecretKey;

		try {
			jwt.verify(token, secretKey);
		} catch (error) {
			console.log(error);
			if (error instanceof TokenExpiredError) {
				throw new HttpException(410, "유효 기간이 지난 토큰입니다.");
			}
			throw new HttpException(401, "권한이 없습니다.");
		}

		return true;
	},
};
