import Cookies from 'universal-cookie';
import moment from 'moment';

const cookies = new Cookies();

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const setCookie = (key: string, val: any, options = { expires: moment().add(1, 'days') }) => {
  cookies.set(key, val);
};

export const removeCookie = (key: string, options = {}) => {
  cookies.remove(key, options);
};
