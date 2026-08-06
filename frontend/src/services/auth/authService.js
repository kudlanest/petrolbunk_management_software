// import api from "../api";
import publicApi from "../publicApi";
import privateApi from "../privateApi";

import API_ENDPOINTS from "../../config/apiEndpoints";



export const registerUser = (data) =>
  publicApi.post(API_ENDPOINTS.REGISTER, data);

export const verifyRegistration = (data) =>
  publicApi.post(API_ENDPOINTS.VERIFY_REGISTRATION, data);

export const loginUser = (data) =>
  publicApi.post(API_ENDPOINTS.LOGIN, data);

export const verifyLogin = (data) =>
  publicApi.post(API_ENDPOINTS.VERIFY_LOGIN, data);

export const logoutUser = () =>
  privateApi.post(API_ENDPOINTS.LOGOUT);

export const forgotPassword = (data) =>
  publicApi.post(API_ENDPOINTS.FORGOT_PASSWORD, data);

export const verifyForgotPassword = (data) =>
  publicApi.post(API_ENDPOINTS.VERIFY_FORGOT_PASSWORD, data);

export const resetPassword = (data) =>
  publicApi.post(API_ENDPOINTS.RESET_PASSWORD, data);

export const changePassword = (data) =>
  privateApi.post("/auth/change-password/request", data);

export const verifyChangePassword = (data) =>
  privateApi.post("/auth/change-password/verify", data);

export const changeUsername = (data) =>
  privateApi.post("/auth/change-username/request", data);

export const verifyChangeUsername = (data) =>
    privateApi.post("/auth/change-username/verify", data);

// export const resetPassword = (data) =>
//   api.post("/auth/reset-password", data);

export const resendOTP = (data) =>
  publicApi.post("/auth/resend-otp", data);

export const refreshToken = (data) =>
  privateApi.post("/auth/refresh-token", data);

