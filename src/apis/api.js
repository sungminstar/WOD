import axios from 'axios';

const BASE_URL = 'http://13.209.27.220:8080';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const handleResponse = response => {
  if (response.status === 200 && response.data.success) {
    return response.data.result;
  } else {
    throw new Error(response.data.message || '요청 중 오류가 발생했습니다.');
  }
};

const handleError = error => {
  if (error.response) {
    console.error('Error response:', error.response);
    throw new Error(
      error.response.data.message || '요청 중 오류가 발생했습니다.',
    );
  } else if (error.request) {
    console.error('No response received:', error.request);
    throw new Error('서버로부터 응답이 없습니다.');
  } else {
    console.error('Error in request setup:', error.message);
    throw new Error('요청을 보내는 중 오류가 발생했습니다.');
  }
};

export const apiRequest = async (method, url, data = null) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
