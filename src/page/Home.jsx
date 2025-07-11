import React from "react";
import PrintingShop from "../components/sections/PrintingShop";
import AboutPage from "../components/sections/AboutPage";
import PortfolioGrid from "../components/sections/PortfolioGrid";
import ContactForm from "../components/sections/ContactForm";
// import LandingPage from "../components/sections/LandingPage";

function Home() {
  return (
    <div>
      {/* <LandingPage /> */}
      <PrintingShop />
      <AboutPage />
      <PortfolioGrid />
      <section className="pt-20 pb-20 px-4 bg-gradient-to-br from-blue-800 via-cyan-700 to-teal-600">
        <ContactForm title="Connect With Us" />
      </section>
    </div>
  );
}

export default Home;
