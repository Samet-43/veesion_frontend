import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import Service from "./pages/Service/Service";
import Portfolio from "./pages/Portfolio/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail/PortfolioDetail";
import Merch from "./pages/Merch/Merch";
import MerchDetail from "./pages/MerchDetail/MerchDetail";
import Menu from "./pages/Menu/Menu.tsx";

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
