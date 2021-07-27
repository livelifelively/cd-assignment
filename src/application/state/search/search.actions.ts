export const C_SEARCH_USERS = '[command] [search] search users';

export const E_SEARCH_COMPLETE = '[event] [search] search users complete';

export const R_SEARCH_RESULT = '[reducer] [search] search results';
export const R_RESET_SEARCH_RESULT = '[reducer] [search] reset search results';

export const searchUsers = (searchString: string, collection: User[]) => {
  return {
    type: C_SEARCH_USERS,
    payload: { searchString, collection },
  };
};
