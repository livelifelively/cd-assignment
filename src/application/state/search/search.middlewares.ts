import { C_SEARCH_USERS, E_SEARCH_COMPLETE, R_SEARCH_RESULT } from './search.actions';

const searchUsers = ({ searchString, collection }: { searchString: string; collection: any[] }) => {
  const aggregator: User[] = [];

  return collection.reduce((agg, val) => {
    const nameMatchIndex = val.name.toLowerCase().indexOf(searchString);
    const usernameMatchIndex = val.username.toLowerCase().indexOf(searchString);
    const emailMatchIndex = val.email.toLowerCase().indexOf(searchString);

    if (nameMatchIndex !== -1 || usernameMatchIndex !== -1 || emailMatchIndex !== -1) {
      agg.push({
        nameMatchIndex,
        usernameMatchIndex,
        emailMatchIndex,
        ...val,
      });
    }

    return agg;
  }, aggregator);
};

const searchUsersFlow =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: ReduxAction) => {
    if (action.type === C_SEARCH_USERS) {
      const searchResults = searchUsers(action.payload);

      dispatch({
        type: E_SEARCH_COMPLETE,
        payload: {
          searchResults,
          searchString: action.payload.searchString,
        },
      });
    }

    return next(action);
  };

const processSearchComplete =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: ReduxAction) => {
    next(action);

    if (action.type === E_SEARCH_COMPLETE) {
      dispatch({
        type: R_SEARCH_RESULT,
        payload: action.payload,
      });
    }
  };

export const searchMiddlewares = [searchUsersFlow, processSearchComplete];
