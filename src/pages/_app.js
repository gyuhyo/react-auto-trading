import "../styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store/store";
import { Provider, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import TopBar from "../components/layout/TopBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps }) {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
            <div className="p-5">
              <motion.div
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ type: "linear" }}
              >
                <Component {...pageProps} />
              </motion.div>
            </div>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp;
