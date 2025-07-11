import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavHeader from "./components/common/Header/NavHeader";
import Home from "./page/Home";
import OurPortfolio from "./page/OurPortfolio";
import ContactUs from "./page/ContactUs";
import OffsetPrint from "./page/OffsetPrint";
import Invitation from "./page/Invitation";
import Flex from "./page/Flex";
import DigitalPrint from "./page/DigitalPrint";
import FileUpload from "./page/Fileupload";
import ConfirmationPage from "./page/ConfirmationPage";
import LoginPage from "./page/LoginPage";
import PrivateRoute from "./components/PrivateRoute"; // ✅ added
import Footer from "./components/common/Footer/Footer";
import PayNow from "./page/PayNow";
function App() {
  return (
    <Router>
      <div className="App">
        <NavHeader />
        <main className="mt-[36px] overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<OurPortfolio />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/pay" element={<PayNow />} />
            <Route path="/offset" element={<OffsetPrint />} />
            <Route path="/invitation" element={<Invitation />} />
            <Route path="/flex" element={<Flex />} />
            <Route path="/digital" element={<DigitalPrint />} />
            <Route
              path="/fileupload"
              element={
                <PrivateRoute>
                  <FileUpload />
                </PrivateRoute>
              }
            />
            <Route path="/admin" element={<LoginPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
