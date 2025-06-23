import React, { useState } from "react";
import { assets, categories, categoryImages } from "./../assets/assets";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCategory, setActiveCategory] = useState("people");

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="mb-16 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
        Stunning quality.
      </h2>

      {/* category selector */}
      <div className="flex justify-center mb-10 flex-wrap">
        <div className="inline-flex gap-4 bg-gray-100 p-2 rounded-full flex-wrap justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium ${
                activeCategory === category
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
              {/* capitalize for display */}
            </button>
          ))}
        </div>
      </div>

      {/* image comparison slider */}
      <div className="relative w-full max-w-4xl h-[450px] overflow-hidden m-auto rounded-xl shadow-lg">
        <img
          src={categoryImages[activeCategory].original}
          alt="original image"
          className="w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />

        <img
          src={categoryImages[activeCategory].processed}
          alt="removed background image"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        <input
          type="range"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider"
          min={0}
          max={100}
          onChange={handleSliderChange}
          value={sliderPosition}
        />
      </div>
    </div>
  );
};

export default BgSlider;
