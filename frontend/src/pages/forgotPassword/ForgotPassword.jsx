import { Box } from "@mui/material";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword() {

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#08111F,#0F172A,#0B1D35)"
      }}
    >

      <ForgotPasswordForm />

    </Box>

  );

}