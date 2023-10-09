import { JWT } from "../module/jwt";
import { config } from 'dotenv';
config();

interface GoogleUser {
  email: string;
  name: string;
  imageUrl: string;
  picture: string;
}

// 디코딩 해 유저 정보 가져오기
const decodeBase64 = (credential: string) => {
  const base64Payload = credential.split('.')[1];
  const payloadBuffer = Buffer.from(base64Payload, 'base64');
  const updatedJwtPayload = JSON.parse(payloadBuffer.toString());
  return updatedJwtPayload;
}

// 가져온 유저 정보 조회 - 이메일 값 이용
const getUser = async (googleUser: GoogleUser) => {
  const jsonServer = process.env.JSON_SERVER;
  const email = googleUser.email;
  const response = await fetch(`${jsonServer}/user?email=${email}`, { headers: { "Content-Type": "application/json" } });
  let user = await response.json();

  // 없으면 생성후 유저 정보 가져오기
  if (!user.length) {

    const response = await fetch(`${jsonServer}/user/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: googleUser.email,
        name: googleUser.name,
        comment: `안녕하세요 ${googleUser.name} 입니다.`,
        imageUrl: googleUser.picture
      })
    })

    user = await response.json();
  }

  const id = user[0].id;

  const userInfo = await fetch(`${jsonServer}/user/${id}`);

  user = await userInfo.json();

  return user;
};


// 유저 정보를 이용해 jwt 발급
export const signIn = async (credential: string | undefined) => {
  if (!credential) {
    return;
  }
  // 유저 정보 가져오기
  const googleUser = decodeBase64(credential);
  const user = await getUser(googleUser);

  // 토큰 발급
  const token = await JWT.sign(user.email);

  return { ...user, token };
}
