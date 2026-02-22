import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useEffect } from "react";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Necklaces from "./pages/Archive/Necklaces";
import Bracelets from "./pages/Archive/Bracelets";
import Earrings from "./pages/Archive/Earrings";
import HighEndPearlDesigns from "./pages/Archive/HighEndPearlDesigns";
import NotFound from "./pages/NotFound";

import ProductPage from "./pages/Product/ProductPage";

import SiteLayout from "./components/layout/SiteLayout";

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const pageTransition: Transition = {
  duration: 0.55,
  ease: luxuryEase,
};

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <SiteLayout>
              <motion.main
                className="min-h-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Home />
              </motion.main>
            </SiteLayout>
          }
        />

        <Route
          path="/about"
          element={
            <SiteLayout>
              <motion.main
                className="min-h-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <About />
              </motion.main>
            </SiteLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <SiteLayout>
              <motion.main
                className="min-h-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Contact />
              </motion.main>
            </SiteLayout>
          }
        />

        <Route
          path="/archive/necklaces"
          element={
            <SiteLayout>
              <motion.main
                className="min-h-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Necklaces />
              </motion.main>
            </SiteLayout>
          }
        />

        <Route
          path="/archive/bracelets"
          element={
            <SiteLayout>
              <motion.main
                className="min-h-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Bracelets />
              </motion.main>
            </SiteLayout>
          }
        />

        <Route
          path="/archive/earrings"
          element={
            <SiteLayout>
              <motion.main
                className="min-h-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Earrings />
              </motion.main>
            </SiteLayout>
          }
        />

        <Route
          path="/archive/high-end-pearl-designs"
          element={
            <SiteLayout>
              <motion.main
                className="min-h-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HighEndPearlDesigns />
              </motion.main>
            </SiteLayout>
          }
        />

        <Route path="/archive" element={<Navigate to="/archive/necklaces" replace />} />

        {/* NEW: Product detail route */}
        <Route
          path="/product/:category/:slug"
          element={
            <SiteLayout>
              <motion.main
                className="min-h-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <ProductPage />
              </motion.main>
            </SiteLayout>
          }
        />

        <Route
          path="*"
          element={
            <SiteLayout>
              <motion.main
                className="min-h-screen"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <NotFound />
              </motion.main>
            </SiteLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}