import { R_SEARCH_RESULT, R_RESET_SEARCH_RESULT } from './search.actions';

const initialState: any = null;

const searchReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case R_SEARCH_RESULT:
      return action.payload;
    case R_RESET_SEARCH_RESULT:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
