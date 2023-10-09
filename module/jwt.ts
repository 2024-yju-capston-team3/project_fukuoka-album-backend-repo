import jwt from 'jsonwebtoken';
import {
  AccessSecretKey,
  RefreshSecretKey,
  AccessTokenoption,
  RefreshTokenoption,
} from '../config/secretkey';

export const JWT = {
  // 토큰 발급
  sign: async (email: string) => {
    const payload = {
      email
    };

    const token = {
      accessToken: jwt.sign(payload, AccessSecretKey, AccessTokenoption),
      refreshToken: jwt.sign(payload, RefreshSecretKey, RefreshTokenoption)
    };

    return token;
  },
  // 토큰 인증
  verify: async (token: string) => {
    try {
      const decoded = jwt.verify(token, AccessSecretKey);
      return decoded;
    } catch (err) {
      console.log(err);
    }
  }
}