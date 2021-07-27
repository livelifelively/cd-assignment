import {
  C_FETCH_POSTS_FOR_USER,
  R_ADD_POSTS_FOR_USER,
  E_FETCH_POSTS_FOR_USER_FAILED,
  E_FETCH_POSTS_FOR_USER_SUCCESS,
} from './posts.actions';

import { apiRequest } from '../api/api.actions';
import { API_PostByUserId } from '../../../infrastructure/api/posts/posts.requests';

const fetchPostsByUserIdFlow =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: ReduxAction) => {
    if (action.type === C_FETCH_POSTS_FOR_USER) {
      dispatch(
        apiRequest(API_PostByUserId, action.payload, E_FETCH_POSTS_FOR_USER_SUCCESS, E_FETCH_POSTS_FOR_USER_FAILED)
      );
    }

    return next(action);
  };

const processPostsFetchForUserComplete =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: ReduxAction) => {
    next(action);

    if (action.type === E_FETCH_POSTS_FOR_USER_SUCCESS) {
      dispatch({
        type: R_ADD_POSTS_FOR_USER,
        payload: {
          userId: action.meta.userId,
          data: action.payload,
        },
      });
    }
  };

export const postsMiddlewares = [fetchPostsByUserIdFlow, processPostsFetchForUserComplete];
