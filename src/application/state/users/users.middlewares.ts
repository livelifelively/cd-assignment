import { apiRequest } from '../api/api.actions';
import {
  C_FETCH_USERS,
  C_FETCH_USER_DETAILS,
  E_FETCH_USERS_SUCCESS,
  E_FETCH_USERS_FAILED,
  E_FETCH_USER_DETAILS_SUCCESS,
  E_FETCH_USER_DETAILS_FAILED,
  R_USERS_LIST,
  R_APPEND_USER,
} from './users.actions';

import { API_UsersAll, API_UserDetails } from '../../../infrastructure/api/users/users.requests';

const fetchUsersFlow =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: ReduxAction) => {
    if (action.type === C_FETCH_USERS) {
      dispatch(apiRequest(API_UsersAll, {}, E_FETCH_USERS_SUCCESS, E_FETCH_USERS_FAILED));
    }

    return next(action);
  };

const processFetchUsersResponse =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: ReduxAction) => {
    next(action);

    if (action.type === E_FETCH_USERS_SUCCESS) {
      dispatch({ type: R_USERS_LIST, payload: action.payload });
    } else if (action.type === E_FETCH_USERS_FAILED) {
      // ui actions
    }
  };

const fetchUserDetailsFlow =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: ReduxAction) => {
    if (action.type === C_FETCH_USER_DETAILS) {
      dispatch(
        apiRequest(API_UserDetails, { id: action.payload }, E_FETCH_USER_DETAILS_SUCCESS, E_FETCH_USER_DETAILS_FAILED)
      );
    }

    return next(action);
  };

const processFetchUserDetailsResponse =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: ReduxAction) => {
    next(action);

    if (action.type === E_FETCH_USER_DETAILS_SUCCESS) {
      dispatch({ type: R_APPEND_USER, payload: action.payload });
    }
  };

export const usersMiddlwares = [
  fetchUsersFlow,
  processFetchUsersResponse,
  fetchUserDetailsFlow,
  processFetchUserDetailsResponse,
];
