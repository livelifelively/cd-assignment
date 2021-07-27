import { R_ADD_POSTS_FOR_USER } from './posts.actions';
import { cloneDeep } from 'lodash';

const initialState: Record<string, Post> = {};

const postsReducer = (state = initialState, action: ReduxAction) => {
  const stateClone = cloneDeep(state);

  switch (action.type) {
    case R_ADD_POSTS_FOR_USER:
      return {
        ...stateClone,
        [action.payload.userId]: action.payload.data,
      };
    default:
      return state;
  }
};

export default postsReducer;
