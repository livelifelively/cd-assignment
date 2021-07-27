import Axios from 'axios';
import { cloneDeep } from 'lodash';
import { getCookie } from '../cookies';

import Logger from '../logger';

const getUserFromCookie = async () => {
  const user = await getCookie('user');
  return user;
};

const http = Axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  async (config) => {
    const newConfig = cloneDeep(config);

    // read from async storage
    const user = await getUserFromCookie();

    if (user && user.token) {
      newConfig.headers['Authorization'] = `Bearer ${user.token}`;
    }

    Logger.debug('HTTP_REQUEST_INTERCEPTOR--CONFIGS', newConfig);
    return newConfig;
  },
  (error) => {
    // TODO structure the error
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - applicable on all responses via this service
 * Processes response just after its received.
 */
http.interceptors.response.use(
  (response) => {
    Logger.debug('HTTP_RESPONSE_INTERCEPTOR--TRY', '');
    return response;
  },
  async (error) => {
    Logger.debug('HTTP_RESPONSE_INTERCEPTOR--CATCH', '');
    // TODO: call central error display service here
    if (error.response.status === 401) {
      // refresh id_token, else logout.
      try {
        const user = await getUserFromCookie();
        // if there was a token before, fetch refresh token
        if (user && user.token) {
          // const refreshTokenData = await refreshTokenPost({
          //   refreshToken: user.refreshToken,
          //   token: user.token,
          // });
          // if (refreshTokenData.data?.id_token) {
          //   await refreshAuthToken(refreshTokenData.data);
          // } else {
          //   await logout();
          // }
        }
      } catch (e) {
        // await logout();
      }
    } else {
      throw error;
    }
  }
);

function structureAPIResponse(res: any, apiCallId = '') {
  let returnData;
  if (res.status === 200) {
    Logger.debug(`SUCCESS_API_REQUEST: ${apiCallId}`, res.data);
    returnData = {
      status: 'SUCCESS',
      data: res.data,
      error: {
        message: '',
      },
    };
    return returnData;
  }

  returnData = {
    status: 'FAILED',
    data: res.data,
    error: {
      message: 'Request Failed',
    },
  };
  Logger.error(`FAILED_API_REQUEST: ${apiCallId}_THEN`, returnData);
  // Silent failure. #TODO can throw error.
  return returnData;
}

function structureAPIError({
  err,
  requestConfigurations,
  requestData,
}: {
  err: any;
  requestData: any;
  requestConfigurations: any;
}) {
  const error = err.response?.data
    ? {
        ...err.response?.data,
        requestData,
        requestConfigurations,
      }
    : {
        details: 'API Error',
        status: 500,
        message: 'error.http.500',
        title: 'Internal Server Error',
        requestData,
        requestConfigurations,
      };

  Logger.error(`${error.message}`, error);
  return error;
}

function errorResponseAsPerStatusCode(err: any, errorHandlers: any): void {
  if (err.response?.status) {
    if (errorHandlers[err.response.status]) errorHandlers[err.response.status](err.response);
    else errorHandlers['default'](err.response);
  }
}

async function postRequestHandler(requestData: any, requestConfigurations: any, headerData = {}) {
  const { apiCallId, url, errorHandlers } = requestConfigurations;
  const headers = { ...headerData };

  try {
    const res = await http.post(url(), requestData, { headers });
    // TODO can pass in adapters as well if needed.
    return structureAPIResponse(res, apiCallId);
  } catch (err) {
    errorResponseAsPerStatusCode(err, errorHandlers);
    const structuredError = structureAPIError({ err, requestData, requestConfigurations });
    throw structuredError;
  }
}

async function getRequestHandler(requestData: any, requestConfigurations: any) {
  const { apiCallId, url, errorHandlers } = requestConfigurations;
  const requestURL = url(requestData);

  try {
    const res = await http.get(requestURL);
    // TODO can pass in adapters as well if needed.
    return structureAPIResponse(res, apiCallId);
  } catch (err) {
    errorResponseAsPerStatusCode(err, errorHandlers);
    const structuredError = structureAPIError({ err, requestData, requestConfigurations });
    throw structuredError;
  }
}

async function deleteRequestHandler(requestData: any, requestConfigurations: any) {
  const { apiCallId, url, errorHandlers } = requestConfigurations;
  const requestURL = url(requestData);

  try {
    const res = await http.delete(requestURL);
    return structureAPIResponse(res, apiCallId);
  } catch (err) {
    errorResponseAsPerStatusCode(err, errorHandlers);
    const structuredError = structureAPIError({ err, requestData, requestConfigurations });
    throw structuredError;
  }
}

async function putRequestHandler(requestData: any, requestConfigurations: any) {
  const { apiCallId, url, errorHandlers } = requestConfigurations;
  const requestUrl = url(requestData);

  try {
    const res = await http.put(requestUrl, requestData);
    return structureAPIResponse(res, apiCallId);
  } catch (err) {
    errorResponseAsPerStatusCode(err, errorHandlers);
    const structuredError = structureAPIError({ err, requestData, requestConfigurations });
    throw structuredError;
  }
}

export const apiRequestHandler = async (requestData: any, requestConfig: any) => {
  if (requestConfig.method === 'GET') {
    return getRequestHandler(requestData, requestConfig);
  } else if (requestConfig.method === 'POST') {
    return postRequestHandler(requestData, requestConfig);
  } else if (requestConfig.method === 'DEL') {
    return deleteRequestHandler(requestData, requestConfig);
  } else if (requestConfig.method === 'PUT') {
    return putRequestHandler(requestData, requestConfig);
  }
  return [];
};
