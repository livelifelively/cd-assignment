import { C_API_REQUEST } from './api.actions';

// this middleware care only for API calls
export const apiMiddleware =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: ReduxAction) => {
    if (action.type === C_API_REQUEST) {
      const { requestFunction, onSuccess, onError } = action.meta;

      // return response from api in payload and request in meta
      try {
        const data = await requestFunction(action.payload);
        if (onSuccess) dispatch({ type: onSuccess, payload: data, meta: action.payload });
      } catch (error) {
        dispatch({ type: onError, payload: error, meta: action.payload });
      }
    }
    return next(action);
  };
