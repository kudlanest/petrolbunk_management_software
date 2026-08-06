const API_ENDPOINTS = {

  // Authentication
  REGISTER: "/auth/register",
  VERIFY_REGISTRATION: "/auth/verify-registration",

  LOGIN: "/auth/login",
  VERIFY_LOGIN: "/auth/login/verify",

  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_FORGOT_PASSWORD: "/auth/verify-forgot-password-otp",
  RESET_PASSWORD: "/auth/reset-password",

  RESEND_OTP: "/auth/resend-otp",

  REFRESH_TOKEN: "/auth/refresh-token",
  LOGOUT: "/auth/logout",

//   OTP_VERIFICATION_PAGE_ENDPOINT:"/otp-verification"

  // Fuels
//   GET_FUELS: "/fuels",
//   ADD_FUEL: "/fuels",
//   UPDATE_FUEL_STATUS: `/fuels/${id}/status?status=${status}`,
//   DELETE_FUEL: `/fuels/${fuelId}`,

  //Units
    // GET_UNITS: "/units",
    // ADD_UNIT: "/units",
    // DELETE_UNIT: `/units/${unitId}`,

    //Fuel Rates
    // CREATE_FUEL_RATE: "/fuel-rates",
    // GET_FUEL_RATES: "/fuel-rates",
    // UPDATE_FUEL_RATES: "/fuel-rates",
    // GET_FUEL_RATE_HISTORY: "/fuel-rates/history",



};

export default API_ENDPOINTS;