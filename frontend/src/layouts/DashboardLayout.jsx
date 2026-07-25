// import React, { useState } from "react";
// import { Box, Toolbar } from "@mui/material";
// import { Outlet } from "react-router-dom";

// import Sidebar from "../components/dashboard/sidebar/Sidebar";
// import TopBar from "../components/dashboard/appbar/TopBar";
// import Footer from "../components/dashboard/footer/Footer";

// const drawerWidth = 260;
// const collapsedWidth = 80;

// export default function DashboardLayout() {
//   const [open, setOpen] = useState(true);

//   const handleDrawerToggle = () => {
//     setOpen((prev) => !prev);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         minHeight: "100vh",
//         bgcolor: "#08111F",
//       }}
//     >
//       {/* Sidebar */}
//  <Sidebar
//   open={open}
//   drawerWidth={drawerWidth}
//   collapsedWidth={collapsedWidth}
//   onToggle={handleDrawerToggle}
// />

//       {/* Main Section */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           display: "flex",
//           flexDirection: "column",
//           ml: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
//           transition: "margin .3s ease",
//         }}
//       >
//         {/* Top App Bar */}
//         <TopBar
//           open={open}
//           drawerWidth={drawerWidth}
//           collapsedWidth={collapsedWidth}
//           onMenuClick={handleDrawerToggle}
//         />

//         {/* Space below AppBar */}
//         <Toolbar />

//         {/* Page Content */}
//         <Box
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             overflow: "auto",
//             bgcolor: "#08111F",
//           }}
//         >
//           <Outlet />
//         </Box>

//         {/* Footer */}
//         <Footer />
//       </Box>
//     </Box>
//   );
// }

import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/sidebar/Sidebar";
import TopBar from "../components/dashboard/appbar/TopBar";
import Footer from "../components/dashboard/footer/Footer";

const drawerWidth = 260;
const collapsedWidth = 80;
const appBarHeight = 64;
const footerHeight = 60;

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#08111F",
      }}
    >
      {/* Top Bar */}
      <TopBar
        open={open}
        drawerWidth={drawerWidth}
        collapsedWidth={collapsedWidth}
        onMenuClick={handleDrawerToggle}
      />

      {/* Body */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          mt: `${appBarHeight}px`,
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <Sidebar
          open={open}
          drawerWidth={drawerWidth}
          collapsedWidth={collapsedWidth}
          onToggle={handleDrawerToggle}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: "auto",
            bgcolor: "#08111F",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}