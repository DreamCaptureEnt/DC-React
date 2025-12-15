import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./sections/Header";
import Home from "./Home";
import CareersPage from "./sections/Careers";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Preloader from "./components/Preloader";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hasLoadedOnce) {
      const timer = setTimeout(() => {
        setLoading(false);
        setHasLoadedOnce(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [hasLoadedOnce]);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, lenis]);

  return (
    <>
      {isLoading && !hasLoadedOnce && <Preloader />}

      <ReactLenis root>
        <div
          className="min-h-screen"
          style={{
            background:
              "radial-gradient(circle, #01092d 10%, #01092d 50%, #01092d 100%)",
          }}
        >
          {location.pathname === "/" && <Header />}

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div
                    className="min-h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Home />
                  </motion.div>
                }
              />
              <Route
                path="/careers"
                element={
                  <motion.div
                    className="min-h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <CareersPage />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </ReactLenis>
    </>
  );
}

export default App;
