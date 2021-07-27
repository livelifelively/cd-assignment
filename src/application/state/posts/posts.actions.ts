export const C_FETCH_POSTS_FOR_USER = '[command] [posts] fetch posts for user';

export const E_FETCH_POSTS_FOR_USER_SUCCESS = '[event] [posts] fetch posts for user success';
export const E_FETCH_POSTS_FOR_USER_FAILED = '[event] [posts] fetch posts for user failed';

export const R_ADD_POSTS_FOR_USER = '[reducer] [search] search results';

export const fetchPosts = (userId: number) => {
  return {
    type: C_FETCH_POSTS_FOR_USER,
    payload: { userId },
  };
};
