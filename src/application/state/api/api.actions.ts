export const C_API_REQUEST = '[command] [app] API Request';

export const apiRequest = (requestFunction: any, body: any, onSuccess: string, onError: string) => ({
  type: C_API_REQUEST,
  payload: body,
  meta: { requestFunction, onSuccess, onError },
});
