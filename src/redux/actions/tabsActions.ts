import Axios, { AxiosInstance, AxiosStatic, AxiosPromise } from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { axiosWithAuth } from '../../utils';

const GET = 'get';
// const POST = 'post';
// const PUT = 'put';
// const DELETE = 'delete';

export const GET_DATA_START = 'GET_DATA_START';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE';
export const GET_DATA_WITH_AUTH_START = 'GET_DATA_WITH_AUTH_START';
export const GET_DATA_WITH_AUTH_SUCCESS = 'GET_DATA_WITH_AUTH_SUCCESS';
export const GET_DATA_WITH_AUTH_FAILURE = 'GET_DATA_WITH_AUTH_FAILURE';
export const EXAMPLE_TYPE = 'EXAMPLE_TYPE';

interface buildThunkFactoryProps {
  // restFunction: () => AxiosStatic | AxiosInstance,
  restFunction: () => {
    get: (url: string, data: {}) => AxiosPromise,
    post: (url: string, data: {}) => AxiosPromise,
    put: (url: string, data: {}) => AxiosPromise,
    delete: (url: string, data: {}) => AxiosPromise,
  },
}

interface buildThunkProps {
  restCallType: 'get' | 'post' | 'put' | 'delete',
  start: string,
  success: string,
  failure: string,
}

interface thunkProps {
  url: string,
  query: string,
  data: Object,
}

interface thunkDispatchProps {
  type: string,
  payload?: any,
}

const buildThunkFactory = ({ restFunction }: buildThunkFactoryProps) => ({
  restCallType, start, success, failure,
}: buildThunkProps) => ({ url, query, data }: thunkProps) => (
  async (dispatch: ThunkDispatch<thunkDispatchProps, {}, any>) => {
    dispatch({ type: start });
    try {
      const response = await restFunction()[restCallType](`${url}${query}`, data);
      dispatch({ type: success, payload: response.data });
    } catch (error) {
      dispatch({ type: failure, payload: error.response });
    }
  });

const buildAxiosThunk = buildThunkFactory({ restFunction: () => Axios });
const buildAxiosWithAuthThunk = buildThunkFactory({ restFunction: axiosWithAuth });

export const getData = buildAxiosThunk({
  restCallType: GET,
  start: GET_DATA_START,
  success: GET_DATA_SUCCESS,
  failure: GET_DATA_FAILURE,
});

export const getDataWithAuth = buildAxiosWithAuthThunk({
  restCallType: GET,
  start: GET_DATA_WITH_AUTH_START,
  success: GET_DATA_WITH_AUTH_SUCCESS,
  failure: GET_DATA_WITH_AUTH_FAILURE,
});

export const exampleFunction = (examplePayload: string) => ({
  type: EXAMPLE_TYPE,
  payload: examplePayload,
});
