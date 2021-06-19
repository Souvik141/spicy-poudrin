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
} from "../constants";
import axios from "axios";

export const addDeal = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_DEAL_REQUEST });
    const {
      entityState: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/deals/add", value, config);
    dispatch({
      type: ADD_DEAL_SUCCESS,
      deals: data.deals,
      totalDeal: data.totalDealAmount,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response.data);
    dispatch({
      type: ADD_DEAL_FAIL,
      payload: error.response.data.message
    });
  }
};

export const getDeals = (key) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_DEAL_REQUEST });
    const {
      entityState: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    var endpointUrl = "/api/deals/";
    if (key) endpointUrl += key;
    const { data } = await axios.get(encodeURI(endpointUrl), config);
    dispatch({
      type: FETCH_DEAL_SUCCESS,
      deals: data.deals,
      totalDeal: data.totalDealAmount,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DEAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDeal = (deal) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_DEAL_REQUEST });
    const {
      entityState: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/deals/", deal, config);
    dispatch({
      type: UPDATE_DEAL_SUCCESS,
      deals: data.deals,
      totalDeal: data.totalDealAmount,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DEAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDeal = (deal) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_DEAL_REQUEST });
    const {
      entityState: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: deal,
    };
    console.log(deal);
    const { data } = await axios.delete("/api/deals/", config);
    dispatch({
      type: DELETE_DEAL_SUCCESS,
      deals: data.deals,
      totalDeal: data.totalDealAmount,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DEAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
