import AsyncStorage from '@react-native-async-storage/async-storage';

// 저장
export const setUserToken = async (key, value) => {
  return await AsyncStorage.setUserToken(key, JSON.stringify(value));
};

// 불러오기
export const getUserToken = async key => {
  const res = await AsyncStorage.getItem(key);
  return JSON.parse(res);
};

// 토큰 제거(로그아웃)
export const removeUserToken = async key => {
  return await AsyncStorage.removeItem(key);
};
