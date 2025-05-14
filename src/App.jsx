import './App.scss'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LivePreview from "./pages/LivePreview";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Navbar from "./components/Navbar";
import ConfirmUnload from "./components/ConfirmUnload";

const App = () => {
    return (
        <Router>
            <ConfirmUnload />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/live" element={<LivePreview />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
        </Router>
    );
};

export default App;
