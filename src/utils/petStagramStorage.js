// @flow
import store from 'store/dist/store.modern'

const namespace = 'petStagramStorage'
export const KEYS = {
  user: 'user',
  login: 'login',
  username: 'username',
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
}

const getItem = async (key: string) => {
  try {
    const savedValue = await store.get(`@${namespace}:${key}`);

    return JSON.parse(savedValue);
  } catch (e) {
    return null;
  }
};

const setItem = async (key: string, value: any) => {
  try {
    return await store.set(`@${namespace}:${key}`, JSON.stringify(value));
  } catch (e) {
    return null;
  }
};

const removeItem = async (key: string) => {
  try {
    return await store.remove(`@${namespace}:${key}`);
  } catch (e) {
    return null;
  }
};

export default {
  getItem,
  setItem,
  removeItem,
};
