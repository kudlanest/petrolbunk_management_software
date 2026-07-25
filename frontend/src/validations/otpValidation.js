import * as Yup from "yup";

const otpValidation = Yup.object({

  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]{6}$/, "OTP must be exactly 6 digits")

});

export default otpValidation;