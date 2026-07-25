import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { motion, AnimatePresence } from "framer-motion";

export default function SuccessAnimation({
  open,
  onClose,
}) {

  useEffect(() => {

    if(open){

      const timer = setTimeout(() => {
        onClose();
      },3000);

      return () => clearTimeout(timer);

    }

  },[open,onClose]);

  return (

    <AnimatePresence>

      {open && (

        <Box
          sx={{
            position:"fixed",
            inset:0,
            bgcolor:"rgba(0,0,0,.65)",
            backdropFilter:"blur(10px)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            zIndex:9999,
          }}
        >

          <motion.div

            initial={{
              opacity:0,
              scale:.6,
              y:50
            }}

            animate={{
              opacity:1,
              scale:1,
              y:0
            }}

            exit={{
              opacity:0,
              scale:.8
            }}

            transition={{
              duration:.5
            }}

            style={{
              width:380,
              padding:"45px",
              borderRadius:"25px",
              textAlign:"center",
              background:"rgba(255,255,255,.08)",
              border:"1px solid rgba(255,255,255,.15)",
              backdropFilter:"blur(25px)",
              boxShadow:"0 0 40px rgba(34,197,94,.35)"
            }}

          >

            <motion.div

              initial={{
                scale:0
              }}

              animate={{
                scale:[0,1.2,1]
              }}

              transition={{
                duration:.8
              }}

            >

              <CheckCircleRoundedIcon

                sx={{
                  fontSize:90,
                  color:"#22C55E",
                  filter:"drop-shadow(0 0 15px #22C55E)"
                }}

              />

            </motion.div>

            <Typography

              variant="h4"

              fontWeight="bold"

              color="white"

              mt={2}

            >

              Success!

            </Typography>

            <Typography

              mt={2}

              color="#CBD5E1"

            >

              Registration completed successfully.

            </Typography>

            <Typography

              mt={1}

              color="#22C55E"

            >

              Redirecting...

            </Typography>

          </motion.div>

        </Box>

      )}

    </AnimatePresence>

  );

}