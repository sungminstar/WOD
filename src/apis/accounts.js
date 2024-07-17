import {apiRequest} from './api';

// 회원가입 데이터 전송 함수
export const signUp = async (email, password, nickName, phoneNumber) => {
  const signData = {email, password, nickName, phoneNumber};
  console.log('SignUp request data: ', signData);
  return await apiRequest('post', '/accounts', signData);
};

// 사용자 정보 요청 함수
export const getUserInfo = async () => {
  const userData = await apiRequest('get', '/accounts/info');
  console.log('getUserInfo response:', userData);
  return userData;
};

// 사용자 마이페이지 게시글 이미지 요청 함수
export const getMyPageInfo = async () => {
  const userData = await apiRequest('get', '/accounts/info/mypage');
  console.log('MyPageInfo response:', userData);
  return userData;
};
