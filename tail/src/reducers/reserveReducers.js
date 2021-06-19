import {
  ADD_RESERVE_REQUEST,
  ADD_RESERVE_SUCCESS,
  ADD_RESERVE_FAIL,
  FETCH_RESERVE_REQUEST,
  FETCH_RESERVE_SUCCESS,
  FETCH_RESERVE_FAIL,
  UPDATE_RESERVE_REQUEST,
  UPDATE_RESERVE_SUCCESS,
  UPDATE_RESERVE_FAIL,
  DELETE_RESERVE_REQUEST,
  DELETE_RESERVE_SUCCESS,
  DELETE_RESERVE_FAIL,
  RESET_RESERVES,
} from "../constants";

export const reserveReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_RESERVE_REQUEST:
    case ADD_RESERVE_REQUEST:
    case UPDATE_RESERVE_REQUEST:
    case DELETE_RESERVE_REQUEST:
      return { loading: true };
    case FETCH_RESERVE_SUCCESS:
    case ADD_RESERVE_SUCCESS:
    case UPDATE_RESERVE_SUCCESS:
    case DELETE_RESERVE_SUCCESS:
      console.log(action)
      return {
        loading: false,
        reserves: action.reserves
      };
    case FETCH_RESERVE_FAIL:
    case ADD_RESERVE_FAIL:
    case UPDATE_RESERVE_FAIL:
    case DELETE_RESERVE_FAIL:
      return {
        loading: false,
        reserves: [],
        error: action.error
      };

    case RESET_RESERVES:
      return {
        reserves: [],
        totalReserve: undefined
      };

    default:
      return state;
  }
};
