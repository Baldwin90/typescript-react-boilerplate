import Axios, {
  // AxiosInstance,
  // AxiosStatic,
  AxiosPromise,
  AxiosResponse,
} from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { axiosWithAuth } from '../../utils';

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';

const exampleMainUrl = 'https://example.com';

export const POST_LOGIN_START = 'POST_LOGIN_START';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE';
export const GET_DATA_WITH_AUTH_START = 'GET_DATA_WITH_AUTH_START';
export const GET_DATA_WITH_AUTH_SUCCESS = 'GET_DATA_WITH_AUTH_SUCCESS';
export const GET_DATA_WITH_AUTH_FAILURE = 'GET_DATA_WITH_AUTH_FAILURE';
export const POST_DATA_WITH_AUTH_START = 'POST_DATA_WITH_AUTH_START';
export const POST_DATA_WITH_AUTH_SUCCESS = 'POST_DATA_WITH_AUTH_SUCCESS';
export const POST_DATA_WITH_AUTH_FAILURE = 'POST_DATA_WITH_AUTH_FAILURE';
export const PUT_DATA_WITH_AUTH_START = 'PUT_DATA_WITH_AUTH_START';
export const PUT_DATA_WITH_AUTH_SUCCESS = 'PUT_DATA_WITH_AUTH_SUCCESS';
export const PUT_DATA_WITH_AUTH_FAILURE = 'PUT_DATA_WITH_AUTH_FAILURE';
export const DELETE_DATA_WITH_AUTH_START = 'DELETE_DATA_WITH_AUTH_START';
export const DELETE_DATA_WITH_AUTH_SUCCESS = 'DELETE_DATA_WITH_AUTH_SUCCESS';
export const DELETE_DATA_WITH_AUTH_FAILURE = 'DELETE_DATA_WITH_AUTH_FAILURE';
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

interface EndPointProps {
  url: string,
  endpoint: string,
}

interface BuildThunkProps {
  restCallType: 'get' | 'post' | 'put' | 'delete',
  start: string,
  success: string,
  failure: string,
}

interface ThunkProps {
  data: Object,
}

interface ThunkDispatchProps {
  type: string,
  payload?: any,
}

export interface ThunkResult {
  error: boolean,
  response: AxiosResponse<any>,
}

const buildThunkFactory = ({
  restFunction,
}: buildThunkFactoryProps) => ({
  url, endpoint,
}: EndPointProps) => ({
  restCallType, start, success, failure,
}: BuildThunkProps) => ({
  data,
}: ThunkProps) => async (
  dispatch: ThunkDispatch<ThunkDispatchProps, void, any>,
) => {
  dispatch({ type: start });
  try {
    const response = await restFunction()[restCallType](`${url}${endpoint}`, data);
    dispatch({ type: success, payload: response.data });
    return { error: false, response };
  } catch (error) {
    dispatch({ type: failure, payload: error.response });
    return { error: true, response: error.response };
  }
};

const buildAxiosThunk = buildThunkFactory({ restFunction: () => Axios });
const buildAxiosWithAuthThunk = buildThunkFactory({ restFunction: axiosWithAuth });

export const postLogin = buildAxiosThunk({ url: exampleMainUrl, endpoint: '/login' })({
  restCallType: POST,
  start: POST_LOGIN_START,
  success: POST_LOGIN_SUCCESS,
  failure: POST_LOGIN_FAILURE,
});

const buildExampleEndPointThunk = buildAxiosWithAuthThunk({ url: exampleMainUrl, endpoint: '/example' });
export const getExampleData = buildExampleEndPointThunk({
  restCallType: GET,
  start: GET_DATA_WITH_AUTH_START,
  success: GET_DATA_WITH_AUTH_SUCCESS,
  failure: GET_DATA_WITH_AUTH_FAILURE,
});
export const postExampleData = buildExampleEndPointThunk({
  restCallType: POST,
  start: POST_DATA_WITH_AUTH_START,
  success: POST_DATA_WITH_AUTH_SUCCESS,
  failure: POST_DATA_WITH_AUTH_FAILURE,
});
export const putExampleData = buildExampleEndPointThunk({
  restCallType: PUT,
  start: PUT_DATA_WITH_AUTH_START,
  success: PUT_DATA_WITH_AUTH_SUCCESS,
  failure: PUT_DATA_WITH_AUTH_FAILURE,
});
export const deleteExampleData = buildExampleEndPointThunk({
  restCallType: DELETE,
  start: DELETE_DATA_WITH_AUTH_START,
  success: DELETE_DATA_WITH_AUTH_SUCCESS,
  failure: DELETE_DATA_WITH_AUTH_FAILURE,
});

export const exampleFunction = (examplePayload: any) => ({
  type: EXAMPLE_TYPE,
  payload: examplePayload,
});
