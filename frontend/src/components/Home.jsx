import React from "react";
import Header from "./Header";
import BgRemovalSteps from "./BgRemovalSteps";
import BgSlider from "./BgSlider";
import Pricing from "./Pricing";
import Testimonials from './Testimonials';
import TryNow from './TryNow';

const Home = () => {
  return (
    <div className="max-w-7xl mask-auto px-4 sm:px-6 lg:px-8 py-16 font-['Outfit']">
      {/* Hero Section */}
      <Header />
      {/* Background removal Steps section */}
      <BgRemovalSteps />
      <BgSlider />
      <Pricing />
      <Testimonials />
      <TryNow />
    </div>
  );
};

export default Home;
