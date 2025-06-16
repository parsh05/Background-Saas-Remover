import React from "react";
import { testimonials } from "./../assets/assets";
import leftquote from "./../assets/leftquote.svg";

const Testimonials = () => {
  return (
    <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
        They love us. You will too.
      </h2>

      {/* Body Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col max-w-md mx-auto md:mx-0 justify-between rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col px-6 pt-8 mb-10 space-y-5">
              <img
                src={leftquote}
                alt="Quote icon"
                className="w-6 h-6 text-gray-400"
              />

   

              <p className="text-gray-700 m-0" style={{ hyphens: "auto" }}>
                {testimonial.quote}
              </p>
            </div>
            <div className="flex space-x-2 bg-gray-50 px-6 pt-6 pb-5 rounded-b-xl">
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-gray-900 w-0">
                  {testimonial.author}
                </p>
                <p className="text-gray-500 text-sm m0 mt-1">
                  {testimonial.handle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
