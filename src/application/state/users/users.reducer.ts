import { R_USERS_LIST, R_APPEND_USER } from './users.actions';
import { cloneDeep } from 'lodash';

const initialState: User[] = [];

const usersReducer = (state = initialState, action: ReduxAction) => {
  const stateClone = cloneDeep(state);

  switch (action.type) {
    case R_USERS_LIST:
      return action.payload;
    case R_APPEND_USER:
      return [...stateClone, action.payload];
    default:
      return state;
  }
};

export default usersReducer;
