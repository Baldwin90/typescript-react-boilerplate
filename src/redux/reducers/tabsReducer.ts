import {
  GET_DATA_START,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  GET_DATA_WITH_AUTH_START,
  GET_DATA_WITH_AUTH_SUCCESS,
  GET_DATA_WITH_AUTH_FAILURE,
  EXAMPLE_TYPE,
} from '../actions';

const initialState = {
  exampleVariable: 'Example',
};

interface actionProps {
  type: string,
  payload?: any,
}

export const reducer = (state = initialState, { type, payload }: actionProps) => {
  switch (type) {
    case GET_DATA_START:
      return {
        ...state,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
      };
    case GET_DATA_FAILURE:
      return {
        ...state,
      };
    case GET_DATA_WITH_AUTH_START:
      return {
        ...state,
      };
    case GET_DATA_WITH_AUTH_SUCCESS:
      return {
        ...state,
      };
    case GET_DATA_WITH_AUTH_FAILURE:
      return {
        ...state,
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
