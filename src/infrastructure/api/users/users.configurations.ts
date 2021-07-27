/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_CONFIG } from '../../app-config/api-config';

const URLPrefixes = {
  API: `${API_CONFIG.baseURL}${API_CONFIG.apiPrefix}`,
};

export const UsersAPIConfigurations = {
  USERS_ALL: {
    url: (requestData: any) => URLPrefixes.API + '/users',
    apiCallId: 'USERS_ALL',
    method: 'GET',
    errorHandlers: {
      '409': (response: any) => {
        console.log('HANDLE 409 ERROR', response);
      },
      default: (response: any) => {
        // console.log('HANDLE GENERIC ERROR', response);
      },
    },
  },
  USER_DETAILS: {
    url: (requestData: any) => URLPrefixes.API + '/users/' + requestData.id,
    apiCallId: 'USER_DETAILS',
    method: 'GET',
    errorHandlers: {
      '409': (response: any) => {
        console.log('HANDLE 409 ERROR', response);
      },
      default: (response: any) => {
        // console.log('HANDLE GENERIC ERROR', response);
      },
    },
  },
  USER_POSTS: {
    url: (requestData: any) => URLPrefixes.API + '/users/' + requestData.id + '/posts',
    apiCallId: 'UPDATE_STORY',
    method: 'GET',
    errorHandlers: {
      '409': (response: any) => {
        console.log('HANDLE 409 ERROR', response);
      },
      default: (response: any) => {
        // console.log('HANDLE GENERIC ERROR', response);
      },
    },
  },
};
