import AsyncStorage from './petStagramStorage'
import {KEYS} from './petStagramStorage'
const AUTHENTICATION_STORAGE_KEY = 'accessToken'

export function getAuthenticationToken() {
  try {
    const token = AsyncStorage.get(AUTHENTICATION_STORAGE_KEY)
    if (token) {
      return token
    }
    return null
  } catch (e) {
    return null
  }
}

export function setAuthenticationToken(token,username,password) {
  AsyncStorage.set(KEYS.username, username);
  AsyncStorage.set(KEYS.password, password);
  return AsyncStorage.set(AUTHENTICATION_STORAGE_KEY, token)
}

export function clearAuthenticationToken() {
  return AsyncStorage.remove(AUTHENTICATION_STORAGE_KEY)
}

export function getUserId() {
  try {
    return AsyncStorage.get('UserId')
  } catch (e) {
    return null
  }
}
