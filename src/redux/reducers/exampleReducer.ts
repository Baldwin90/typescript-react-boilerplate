import {
  POST_LOGIN_START,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  GET_DATA_WITH_AUTH_START,
  GET_DATA_WITH_AUTH_SUCCESS,
  GET_DATA_WITH_AUTH_FAILURE,
  POST_DATA_WITH_AUTH_START,
  POST_DATA_WITH_AUTH_SUCCESS,
  POST_DATA_WITH_AUTH_FAILURE,
  PUT_DATA_WITH_AUTH_START,
  PUT_DATA_WITH_AUTH_SUCCESS,
  PUT_DATA_WITH_AUTH_FAILURE,
  DELETE_DATA_WITH_AUTH_START,
  DELETE_DATA_WITH_AUTH_SUCCESS,
  DELETE_DATA_WITH_AUTH_FAILURE,
  EXAMPLE_TYPE,
} from '../actions';

const initialState = {
  exampleVariable: 'Example',
  data: [
    {
      id: 0,
    },
  ],
  sendingLogin: false,
  errorLoggingIn: false,
  loadingTabs: false,
  errorLoadingTabs: false,
  sendingTabData: false,
  errorSendingTab: false,
  deletingTab: false,
  errorDeletingTab: false,
};

interface ActionProps {
  type: string,
  payload?: any,
}

export const reducer = (state = initialState, { type, payload }: ActionProps) => {
  switch (type) {
    case POST_LOGIN_START:
      return {
        ...state,
        sendingLogin: true,
        errorLoggingIn: false,
      };
    case POST_LOGIN_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        sendingLogin: false,
        errorLoggingIn: false,
      };
    case POST_LOGIN_FAILURE:
      return {
        ...state,
        sendingLogin: false,
        errorLoggingIn: true,
      };
    case GET_DATA_WITH_AUTH_START:
      return {
        ...state,
        loadingTabs: true,
        errorLoadingTabs: false,
      };
    case GET_DATA_WITH_AUTH_SUCCESS:
      return {
        ...state,
        loadingTabs: false,
        errorLoadingTabs: false,
        data: payload,
      };
    case GET_DATA_WITH_AUTH_FAILURE:
      return {
        ...state,
        loadingTabs: false,
        errorLoadingTabs: true,
      };
    case POST_DATA_WITH_AUTH_START:
      return {
        ...state,
        sendingTabData: true,
        errorSendingTab: false,
      };
    case POST_DATA_WITH_AUTH_SUCCESS:
      return {
        ...state,
        sendingTabData: false,
        errorSendingTab: false,
        data: [...state.data, payload],
      };
    case POST_DATA_WITH_AUTH_FAILURE:
      return {
        ...state,
        sendingTabData: false,
        errorSendingTab: true,
      };
    case PUT_DATA_WITH_AUTH_START:
      return {
        ...state,
        sendingTabData: true,
        errorSendingTab: false,
      };
    case PUT_DATA_WITH_AUTH_SUCCESS:
      return {
        ...state,
        sendingTabData: false,
        errorSendingTab: false,
        data: state.data.map(data => (data.id === payload.id ? payload : data)),
      };
    case PUT_DATA_WITH_AUTH_FAILURE:
      return {
        ...state,
        sendingTabData: false,
        errorSendingTab: true,
      };
    case DELETE_DATA_WITH_AUTH_START:
      return {
        ...state,
        deletingTab: true,
        errorDeletingTab: false,
      };
    case DELETE_DATA_WITH_AUTH_SUCCESS:
      return {
        ...state,
        deletingTab: false,
        errorDeletingTab: false,
        data: state.data.filter(data => data.id !== payload.id),
      };
    case DELETE_DATA_WITH_AUTH_FAILURE:
      return {
        ...state,
        deletingTab: false,
        errorDeletingTab: true,
      };
    case EXAMPLE_TYPE:
      return {
        ...state,
        exampleVariable: payload,
      };
    default:
      if (state === initialState) return state;
      throw new Error(`${type} is not a valid type`);
  }
};

export default reducer;
