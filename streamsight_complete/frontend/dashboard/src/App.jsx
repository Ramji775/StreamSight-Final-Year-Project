// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Box } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import theme from "./theme";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Login from "./pages/Login";
// import EcommerceSimulator from "./pages/EcommerceSimulator";
// import { useSocket } from "./hooks/useSocket";

// function PrivateLayout() {
//   const { connected } = useSocket();
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   if (!isAuth) return <Navigate to="/login" replace />;

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#07090f" }}>
//       <Navbar connected={connected} />
//       <Box
//         component="main"
//         sx={{
//           flex: 1,
//           p: { xs: 2, md: 3 },
//           overflow: "auto",
//           // Account for collapsible navbar — use margin-left via CSS variable workaround
//           minWidth: 0,
//         }}
//       >
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/analytics" element={<Analytics />} />
//           <Route path="/ecommerce" element={<EcommerceSimulator />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Box>
//     </Box>
//   );
// }

// export default function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/*" element={<PrivateLayout />} />
//         </Routes>
//       </BrowserRouter>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         theme="dark"
//         toastStyle={{
//           background: "#0d1117",
//           border: "1px solid #1e293b",
//           borderRadius: "12px",
//           fontFamily: "'Syne', sans-serif",
//           color: "#e2e8f0",
//         }}
//       />
//     </ThemeProvider>
//   );
// }


// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Box } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import { AnimatePresence, motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";

// import theme from "./theme";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Login from "./pages/Login";
// import EcommerceSimulator from "./pages/EcommerceSimulator";
// import { useSocket } from "./hooks/useSocket";

// function AnimatedRoutes() {
//   const location = useLocation();
//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={location.pathname}
//         initial={{ opacity: 0, x: 16 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -16 }}
//         transition={{ duration: 0.25, ease: "easeInOut" }}
//         style={{ flex: 1, minWidth: 0 }}
//       >
//         <Routes location={location}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/analytics" element={<Analytics />} />
//           <Route path="/ecommerce" element={<EcommerceSimulator />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// function PrivateLayout() {
//   const { connected } = useSocket();
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   if (!isAuth) return <Navigate to="/login" replace />;
//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0f172a" }}>
//       <Navbar connected={connected} />
//       <AnimatedRoutes />
//     </Box>
//   );
// }

// export default function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/*" element={<PrivateLayout />} />
//         </Routes>
//       </BrowserRouter>
//       <ToastContainer
//         position="top-right" autoClose={3500}
//         hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="dark"
//       />
//     </ThemeProvider>
//   );
// }
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import theme from "./theme";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import EcommerceSimulator from "./pages/EcommerceSimulator";
import PaymentPage from "./pages/PaymentPage";
import { useSocket } from "./hooks/useSocket";
import { CartProvider } from "./context/CartContext";
import FlashSales from "./pages/FlashSales"
import Orders from "./pages/Orders"

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ecommerce" element={<EcommerceSimulator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/flash-sales" element={<FlashSales />} />
<Route path="/orders" element={<Orders />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function PrivateLayout() {
  const { connected } = useSocket();
  const isAuth = localStorage.getItem("ss_auth") === "true";
  if (!isAuth) return <Navigate to="/login" replace />;
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0f172a" }}>
      <Navbar connected={connected} />
      <AnimatedRoutes />
    </Box>
  );
}

// Payment page is outside the dashboard layout (full white page like Amazon)
function PaymentLayout() {
  const isAuth = localStorage.getItem("ss_auth") === "true";
  if (!isAuth) return <Navigate to="/login" replace />;
  return <PaymentPage />;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<PaymentLayout />} />
            <Route path="/*" element={<PrivateLayout />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      <ToastContainer
        position="top-right" autoClose={3500}
        hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="dark"
      />
    </ThemeProvider>
  );
}
