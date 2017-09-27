// @flow
export const error = (type: string) =>
  (status: number, message: string, extra: Object) => ({
    type,
    payload: {
      status,
      message,
      extra
    }
  });

export const list = (type: string) =>
  (next: ?number, count: number, normalizedResults: Object) => ({
    type,
    payload: {
      next,
      count,
      response: normalizedResults
    }
  });

export const get = (type: string) =>
  (id: number, normalizedResults: Object) => ({
    type,
    payload: {
      id,
      response: normalizedResults
    }
  });
