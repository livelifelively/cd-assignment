/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_CONFIG } from '../../app-config/api-config';

const URLPrefixes = {
  API: `${API_CONFIG.baseURL}${API_CONFIG.apiPrefix}`,
};

export const PostsAPIConfigurations = {
  POST_BY_USER_ID: {
    url: (requestData: any) => URLPrefixes.API + '/posts?userId=' + requestData.userId,
    apiCallId: 'POST_BY_USER_ID',
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
