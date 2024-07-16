import {apiRequest} from './api';

// 로그인 데이터 전송 함수
export const login = async (email, password) => {
  const loginData = {email, password};
  console.log('Login request data: ', loginData);
  return await apiRequest('post', '/auth', loginData);
};
