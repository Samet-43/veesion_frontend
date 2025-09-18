import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";


import Home from "./pages/home/Home";
import Service from "./pages/service/Service";
import Portfolio from "./pages/portfolio/Portfolio";
import PortfolioDetail from "./pages/portfolioDetail/PortfolioDetail";
import Merch from "./pages/merch/Merch";
import MerchDetail from "./pages/merchDetail/MerchDetail";
import Menu from "./pages/menu/Menu.tsx";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Home />
                        </motion.div>
                    }
                />
                <Route
                    path="/services"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Service />
                        </motion.div>
                    }
                />
                <Route
                    path="/portfolio"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Portfolio />
                        </motion.div>
                    }
                />
                <Route
                    path="/portfolio/:id"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PortfolioDetail />
                        </motion.div>
                    }
                />
                <Route
                    path="/merch"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Merch />
                        </motion.div>
                    }
                />
                <Route
                    path="/merch/:id"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MerchDetail />
                        </motion.div>
                    }
                />
                <Route
                    path="/menu"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );
}

export default App;
