import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FIGURE_REQUEST,
  FIGURE_SUCCESS,
  FIGURE_FAIL,
  FIGURE_RESET,
  UPDATE_FIGURE_REQUEST,
  UPDATE_FIGURE_SUCCESS,
  UPDATE_FIGURE_FAIL,
  UPDATE_FIGURE_RESET,
} from "../constants";

export const entityReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const entityFigureReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case FIGURE_REQUEST:
      return { ...state, loading: true };
    case FIGURE_SUCCESS:
      return { loading: false, user: action.payload };
    case FIGURE_FAIL:
      return { loading: false, error: action.payload };
    case FIGURE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FIGURE_REQUEST:
      return { loading: true };
    case UPDATE_FIGURE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case UPDATE_FIGURE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_FIGURE_RESET:
      return {};
    default:
      return state;
  }
};
