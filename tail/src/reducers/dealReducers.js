import {
  ADD_DEAL_REQUEST,
  ADD_DEAL_SUCCESS,
  ADD_DEAL_FAIL,
  FETCH_DEAL_REQUEST,
  FETCH_DEAL_SUCCESS,
  FETCH_DEAL_FAIL,
  UPDATE_DEAL_REQUEST,
  UPDATE_DEAL_SUCCESS,
  UPDATE_DEAL_FAIL,
  DELETE_DEAL_REQUEST,
  DELETE_DEAL_SUCCESS,
  DELETE_DEAL_FAIL,
  RESET_DEALS,
} from "../constants";

export const dealReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DEAL_REQUEST:
    case ADD_DEAL_REQUEST:
    case UPDATE_DEAL_REQUEST:
    case DELETE_DEAL_REQUEST:
      return { loading: true };
    case FETCH_DEAL_SUCCESS:
    case ADD_DEAL_SUCCESS:
    case UPDATE_DEAL_SUCCESS:
    case DELETE_DEAL_SUCCESS:
      console.log(action)
      return {
        loading: false,
        deals: action.deals,
        totalDeal: action.totalDeal,
      };
    case FETCH_DEAL_FAIL:
    case ADD_DEAL_FAIL:
    case UPDATE_DEAL_FAIL:
    case DELETE_DEAL_FAIL:
      return {
        loading: false,
        deals: [],
        totalDeal: undefined,
        error: action.payload
      };

    case RESET_DEALS:
      return {
        deals: [],
        totalDeal: undefined
      };

    default:
      return state;
  }
};
