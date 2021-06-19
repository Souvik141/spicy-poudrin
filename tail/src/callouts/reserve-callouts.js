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
} from "../constants";
import axios from "axios";

export const addReserve = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_RESERVE_REQUEST });
    const {
      entityState: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/reserves/add", value, config);
    dispatch({
      type: ADD_RESERVE_SUCCESS,
      reserves: data.reserves,
    });
  } catch (error) {
    dispatch({
      type: ADD_RESERVE_FAIL,
      error: error.response.data.message
    });
  }
};

export const getReserves = (key) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_RESERVE_REQUEST });
    const {
      entityState: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/reserves/", config);
    console.log(data);
    dispatch({
      type: FETCH_RESERVE_SUCCESS,
      reserves: data.reserves,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RESERVE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateReserve = (reserve) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_RESERVE_REQUEST });
    const {
      entityState: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/reserves/", reserve, config);
    dispatch({
      type: UPDATE_RESERVE_SUCCESS,
      reserves: data.reserves,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_RESERVE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteReserve = (reserve) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_RESERVE_REQUEST });
    const {
      entityState: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: reserve,
    };
    console.log(reserve);
    const { data } = await axios.delete("/api/reserves/", config);
    dispatch({
      type: DELETE_RESERVE_SUCCESS,
      reserves: data.reserves,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RESERVE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
