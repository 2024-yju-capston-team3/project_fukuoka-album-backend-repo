import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import {
	AccessSecretKey,
	RefreshSecretKey,
	AccessTokenoption,
	RefreshTokenoption,
} from "../config/secretkey";
import { GoneException, UnauthorizeException } from "../util/exception";

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
	verify: (token: string) => {
		try {
			jwt.verify(token, AccessSecretKey, AccessTokenoption);
		} catch (error) {
			console.log(`jwt 인증 오류: ${error}`);
			if (error instanceof TokenExpiredError) {
				throw new GoneException("유효 기간이 지난 토큰입니다.");
			}
			if (error instanceof JsonWebTokenError) {
				throw new UnauthorizeException("권한이 없습니다.");
			}
			throw new Error("인증 실패");
		}

		return true;
	},

	/** 토큰 인증 */
	refreshVerify: (token: string) => {
		try {
			jwt.verify(token, RefreshSecretKey, RefreshTokenoption);
		} catch (error) {
			console.log(error);
			if (error instanceof TokenExpiredError) {
				throw new GoneException("유효 기간이 지난 토큰입니다.");
			}
			throw new UnauthorizeException("권한이 없습니다.");
		}

		return true;
	},
};
