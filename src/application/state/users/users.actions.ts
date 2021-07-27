export const C_FETCH_USERS = '[command] [users] fetch users';
export const C_FETCH_USER_DETAILS = '[command] [users] fetch user details';

export const E_FETCH_USERS_SUCCESS = '[event] [users] fetch users';
export const E_FETCH_USERS_FAILED = '[event] [users] fetch users failed';
export const E_FETCH_USER_DETAILS_SUCCESS = '[event] [users] fetch user details success';
export const E_FETCH_USER_DETAILS_FAILED = '[event] [users] fetch user details failed';

export const R_USERS_LIST = '[reduce] [users] users list';
export const R_APPEND_USER = '[reduce] [users] append user';

export const fetchUsers = () => {
  return {
    type: C_FETCH_USERS,
  };
};

export const fetchUserDetails = (userId: number) => {
  return {
    type: C_FETCH_USER_DETAILS,
    payload: userId,
  };
};
