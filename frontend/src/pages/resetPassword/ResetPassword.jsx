import { Box } from "@mui/material";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPassword() {

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

            <ResetPasswordForm />

        </Box>

    );

}