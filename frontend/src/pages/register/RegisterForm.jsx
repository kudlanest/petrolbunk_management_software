import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  Person,
  Email,
  Phone,
  Badge,
  Lock,
} from "@mui/icons-material";

import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import registerValidation from "../../validations/registerValidation";

import { registerUser } from "../../services/auth/authService";

import {SUCCESS_MESSAGES,ERROR_MESSAGES,INFO_MESSAGES} from "../../constants/message";

import AppSnackbar from "../../components/common/AppSnackbar"; //Step 1: Import the AppSnackbar component


export default function RegisterForm({ onSuccess }) {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const formik = useFormik({

    initialValues: {

      fullName: "",
      email: "",
      phone: "",
      employeeId: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
      terms: false,

    },

    validationSchema: registerValidation,

    onSubmit: (values) => {

      setLoading(true);

      console.log(values);

      //save the data in database
      const { confirmPassword, terms, ...userData } = values;

       registerUser(userData)
        .then((response) => {
          console.log("User registered successfully:", response.data);


          setSnackbar({
            open: true,
            message: SUCCESS_MESSAGES.REGISTER_OTP_SENT,
            severity: "success",
          });

          setLoading(false);
          onSuccess();

          // slight delay so the toast is visible before navigating away
          setTimeout(() => {
            navigate("/otp-verification", {
    state: {
        from: "register",
        email: values.email
    }
});
          }, 1200);


        })
        .catch((error) => {
          console.error("Error registering user:", error);

          const errData = error.response?.data;

          // If backend sends { field, message }, highlight the exact field
          if (errData?.field) {
            formik.setFieldError(errData.field, errData.message);
            formik.setFieldTouched(errData.field, true, false);
          }



          setSnackbar({
            open: true,
            message:  errData?.message ||
              (typeof errData === "string" ? errData : ERROR_MESSAGES.REGISTRATION_FAILED),
            severity: "error",
          });

          setLoading(false);
        });

    }

  });

  const animation = (delay) => ({
    initial: {
      opacity: 0,
      x: 30,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    transition: {
      duration: 0.6,
      delay,
    },
  });

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          p: 2,
        }}
      >

        <Paper

          component={motion.div}

          initial={{
            opacity:0,
            scale:.9,
            y:40
          }}

          animate={{
            opacity:1,
            scale:1,
            y:0
          }}

          transition={{
            duration:.8
          }}

          elevation={0}

          sx={{

            width:{
              xs:"100%",
              sm:650,
              md:720
            },

            borderRadius:5,

            p:5,

            backdropFilter:"blur(25px)",

            background:"rgba(255,255,255,.08)",

            border:"1px solid rgba(255,255,255,.12)",

            boxShadow:"0 0 50px rgba(37,99,235,.3)"

          }}

        >

          <Typography
            variant="h4"
            align="center"
            fontWeight={700}
            color="white"
          >
            Create Account
          </Typography>

          <Typography
            align="center"
            color="#CBD5E1"
            mb={4}
          >
            {INFO_MESSAGES.PROJECT_NAME}
          </Typography>

          <form onSubmit={formik.handleSubmit}>

            <Grid container spacing={2}>

              {/* Full Name */}

              <Grid size={{ xs: 12, md: 6 }}>

                <motion.div {...animation(.1)}>

                  <TextField

                    fullWidth

                    label="Full Name"

                    name="fullName"

                    value={formik.values.fullName}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                    error={

                      formik.touched.fullName &&

                      Boolean(formik.errors.fullName)

                    }

                    helperText={

                      formik.touched.fullName &&

                      formik.errors.fullName

                    }

                    InputProps={{

                      startAdornment:(

                        <InputAdornment position="start">

                          <Person/>

                        </InputAdornment>

                      )

                    }}

                  />

                </motion.div>

              </Grid>

              {/* Email */}

              <Grid size={{ xs: 12, md: 6 }}>

                <motion.div {...animation(.2)}>

                  <TextField

                    fullWidth

                    label="Email"

                    name="email"

                    value={formik.values.email}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                    error={

                      formik.touched.email &&

                      Boolean(formik.errors.email)

                    }

                    helperText={

                      formik.touched.email &&

                      formik.errors.email

                    }

                    InputProps={{

                      startAdornment:(

                        <InputAdornment position="start">

                          <Email/>

                        </InputAdornment>

                      )

                    }}

                  />

                </motion.div>

              </Grid>

              {/* Phone */}

              <Grid size={{ xs: 12, md: 6 }}>

                <motion.div {...animation(.3)}>

                  <TextField

                    fullWidth

                    label="Phone Number"

                    name="phone"

                    value={formik.values.phone}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                    error={

                      formik.touched.phone &&

                      Boolean(formik.errors.phone)

                    }

                    helperText={

                      formik.touched.phone &&

                      formik.errors.phone

                    }

                    InputProps={{

                      startAdornment:(

                        <InputAdornment position="start">

                          <Phone/>

                        </InputAdornment>

                      )

                    }}

                  />

                </motion.div>

              </Grid>

              {/* Employee ID */}

              <Grid size={{ xs: 12, md: 6 }}>

                <motion.div {...animation(.4)}>

                  <TextField

                    fullWidth

                    label="Employee ID"

                    name="employeeId"

                    value={formik.values.employeeId}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                    error={

                      formik.touched.employeeId &&

                      Boolean(formik.errors.employeeId)

                    }

                    helperText={

                      formik.touched.employeeId &&

                      formik.errors.employeeId

                    }

                    InputProps={{

                      startAdornment:(

                        <InputAdornment position="start">

                          <Badge/>

                        </InputAdornment>

                      )

                    }}

                  />

                </motion.div>

              </Grid>

              {/* Username */}

              <Grid size={{ xs: 12, md: 6 }}>

                <motion.div {...animation(.5)}>

                  <TextField

                    fullWidth

                    label="Username"

                    name="username"

                    value={formik.values.username}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                    error={

                      formik.touched.username &&

                      Boolean(formik.errors.username)

                    }

                    helperText={

                      formik.touched.username &&

                      formik.errors.username

                    }

                    InputProps={{

                      startAdornment:(

                        <InputAdornment position="start">

                          <Person/>

                        </InputAdornment>

                      )

                    }}

                  />

                </motion.div>

              </Grid>

              {/* Password */}

              <Grid size={{ xs: 12, md: 6 }}>

                <motion.div {...animation(.6)}>

                  <TextField

                    fullWidth

                    label="Password"

                    type="password"

                    name="password"

                    value={formik.values.password}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                    error={

                      formik.touched.password &&

                      Boolean(formik.errors.password)

                    }

                    helperText={

                      formik.touched.password &&

                      formik.errors.password

                    }

                    InputProps={{

                      startAdornment:(

                        <InputAdornment position="start">

                          <Lock/>

                        </InputAdornment>

                      )

                    }}

                  />

                </motion.div>

              </Grid>

              {/* Confirm Password */}

              <Grid size={{ xs: 12, md: 6 }}>

                <motion.div {...animation(.7)}>

                  <TextField

                    fullWidth

                    label="Confirm Password"

                    type="password"

                    name="confirmPassword"

                    value={formik.values.confirmPassword}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                    error={

                      formik.touched.confirmPassword &&

                      Boolean(formik.errors.confirmPassword)

                    }

                    helperText={

                      formik.touched.confirmPassword &&

                      formik.errors.confirmPassword

                    }

                    InputProps={{

                      startAdornment:(

                        <InputAdornment position="start">

                          <Lock/>

                        </InputAdornment>

                      )

                    }}

                  />

                </motion.div>

              </Grid>

              {/* Role */}

              <Grid size={{ xs: 12, md: 6 }}>

                <motion.div {...animation(.8)}>

                  <TextField

                    fullWidth

                    select

                    label="Role"

                    name="role"

                    value={formik.values.role}

                    onChange={formik.handleChange}

                    onBlur={formik.handleBlur}

                    error={

                      formik.touched.role &&

                      Boolean(formik.errors.role)

                    }

                    helperText={

                      formik.touched.role &&

                      formik.errors.role

                    }

                  >

                    <MenuItem value="">Select Role</MenuItem>

                    <MenuItem value="Admin">Admin</MenuItem>

                    <MenuItem value="Manager">Manager</MenuItem>

                    <MenuItem value="Cashier">Cashier</MenuItem>

                    <MenuItem value="Attendant">Attendant</MenuItem>

                  </TextField>

                </motion.div>

              </Grid>

              {/* Terms */}

              <Grid item xs={12}>

                <motion.div {...animation(.9)}>

                  <FormControlLabel

                    control={

                      <Checkbox

                        name="terms"

                        checked={formik.values.terms}

                        onChange={formik.handleChange}

                        onBlur={formik.handleBlur}

                        sx={{ color: "#38BDF8" }}

                      />

                    }

                    label={

                      <Typography color="#CBD5E1">

                        {INFO_MESSAGES.TERMS_AND_CONDITIONS}

                      </Typography>

                    }

                  />

                  {formik.touched.terms && formik.errors.terms && (

                    <Typography

                      color="error"

                      sx={{ fontSize: 12, ml: 1 }}

                    >

                      {formik.errors.terms}

                    </Typography>

                  )}

                </motion.div>

              </Grid>

              {/* Submit Button */}

              <Grid item xs={12} >

                <motion.div {...animation(1)}>

                  <Button

                    type="submit"

                    fullWidth

                    variant="contained"

                    disabled={loading}

                    sx={{

                      mt: 4,
                      ml:5,

                      height: 55,

                      borderRadius: "14px",

                      background: "linear-gradient(90deg,#2563EB,#38BDF8)",

                      fontWeight: "bold",

                      fontSize: 16,

                      textTransform: "none",

                      boxShadow: "0 10px 25px rgba(37,99,235,.35)",

                      "&:hover": {

                        background: "linear-gradient(90deg,#1D4ED8,#0EA5E9)",

                      },

                    }}

                  >

                    {loading ? (

                      <CircularProgress size={24} sx={{ color: "white" }} />

                    ) : (

                      "Create Account"

                    )}

                  </Button>

                </motion.div>

              </Grid>

            </Grid>

          </form>

          {/* Login Link */}
          <Box textAlign="center" mt={2}>
            <Typography color="#CBD5E1" fontSize={14}>
              Already have an account?{' '}
              <Typography
                component="span"
                sx={{ color: '#38BDF8', cursor: 'pointer', fontWeight: 100}}
                onClick={() => navigate('/login')}
              >
                Login here
              </Typography>
            </Typography>
          </Box>

        </Paper>

      </Box>
                  <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />

    </>
  );

}