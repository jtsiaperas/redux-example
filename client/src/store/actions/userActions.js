import axios from "axios";
import jwt_decode from "jwt-decode";
import cookie from 'js-cookie';
import setAuthToken from "./token";
import {
  SET_CURRENT_USER,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAIL,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAIL,
} from "./types";


//reset password request
export const forgotPassword = (email, history) => async (dispatch, getState) => {
  try {
    // history.push(`/login`);
	dispatch({ type: FORGOT_REQUEST });
    const {data} = await axios.post(`/api/reset/request/${email}`);
    dispatch({ type: FORGOT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FORGOT_FAIL, payload: error.response.data });
  }
}

//reset password change
export const resetPassword = (userData) => async (dispatch, getState) => {
  try {
	dispatch({ type: RESET_REQUEST });
    const {data} = await axios.post(`/api/reset/reset-password`, userData);
    dispatch({ type: RESET_SUCCESS, payload: data })

  } catch (error) {
    dispatch({ type: RESET_FAIL, payload: error.response.data });
  }
}
