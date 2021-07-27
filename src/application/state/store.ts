import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import users from './users/users.reducer';
import searchReducer from './search/search.reducer';
import postsReducer from './posts/posts.reducer';

import { usersMiddlwares } from './users/users.middlewares';
import { apiMiddleware } from './api/api.middlewares';
import { searchMiddlewares } from './search/search.middlewares';
import { postsMiddlewares } from './posts/posts.middlewares';

const rootReducer = combineReducers({
  search: searchReducer,
  users,
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...usersMiddlwares, apiMiddleware, ...searchMiddlewares, ...postsMiddlewares))
);

export default store;
