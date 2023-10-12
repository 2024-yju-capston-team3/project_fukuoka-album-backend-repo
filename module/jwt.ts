import jwt from 'jsonwebtoken';
import {
  AccessSecretKey,
  RefreshSecretKey,
  AccessTokenoption,
  RefreshTokenoption,
} from '../config/secretkey';

export const JWT = {
  /** 토큰 발급 */
  sign: async (email: string, isRefresh?: boolean) => {
    const payload = {
      email
    };

    if (isRefresh) {
      return {
        accessToken: jwt.sign(payload, AccessSecretKey, AccessTokenoption),
      };
    }

    const token = {
      accessToken: jwt.sign(payload, AccessSecretKey, AccessTokenoption),
      refreshToken: jwt.sign(payload, RefreshSecretKey, RefreshTokenoption)
    };

    return token;
  },

  /** 토큰 인증 */
  verify: (token: string, isRefresh?: boolean) => {
    let isVerify = true;
    const secretKey = isRefresh ? RefreshSecretKey : AccessSecretKey 
    
    try {
      jwt.verify(token, secretKey);
    } catch (error) {
      console.log(error);
      isVerify = false;
    }

    return isVerify;
  }
}