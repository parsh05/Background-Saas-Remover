import React from "react";
import { assets } from "./../assets/assets";

const Header = () => {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
      {/* left side video_banner content */}
      <div className="order-2 md:order-1 flex justify-center">
        <div className="shadow-[0.25px_50px_-12px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden">
          <video
            src={assets.video_banner}
            autoPlay
            loop
            muted
            className="w-full max-w-[400px] h-auto object-cover"
          ></video>
        </div>
      </div>

      {/* right side text content */}
      <div className="order-1 md:order-2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          The fastest <span className="text-indigo-700">background eraser</span>
        </h1>

        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Easily remove backgrounds from your images with just one click. Our
          tool is fast, accurate, and designed for professionals who need
          high-quality results. Save time and enhance your visuals effortlessly.
        </p>

        <div>
          <input type="file" accept="image/*" id="upload1" hidden />
          <label
            htmlFor="upload1"
            className="bg-black text-white font-medium px-8 py-4 rounded-full hover:opacity-90 transition-transform hover:scale-105 text-lg"
          >
            Upload your image
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
