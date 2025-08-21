import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/home/Home";
import Service from "./pages/service/Service";
import Portfolio from "./pages/portfolio/Portfolio";
import PortfolioDetail from "./pages/portfolioDetail/PortfolioDetail";
import Merch from "./pages/merch/Merch";
import MerchDetail from "./pages/merchDetail/MerchDetail";
import Menu from "./pages/menu/Menu.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Service />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                <Route path="/merch" element={<Merch />} />
                <Route path="/merch/:id" element={<MerchDetail />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
