import {API} from '.';

export const postAuthLogin = async user => {
  return await API.post('/auth', user);
};
