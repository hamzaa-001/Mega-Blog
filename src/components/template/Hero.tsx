import Image from "next/image";
import React from "react";
import MainBlog from "@/../public/main-blog.png";
import ProfileDemo from "@/../public/profile-demo.png";

const Hero = () => {
  return (
    <div className="w-full min-h-[100vh] lg:py-10 lg:px-40 px-4">
      <div className="relative">
        <div className="relative bg-white rounded-lg  overflow-hidden">
          <Image
            src={MainBlog}
            alt="Technology"
            className="w-full h-[500px] object-cover"
          />
        </div>
        <div className="lg:w-[500px]  z-10 bg-white absolute lg:-bottom-10 lg:left-10 -bottom-10  lg:p-8 p-4 rounded-lg shadow-2xl dark:bg-[#181A2A] dark:text-white mx-8">
          <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Technology
          </span>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h2>
          <div className="mt-4 flex items-center">
            <Image
              src={ProfileDemo}
              alt="Jason Francisco"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Jason Francisco
              </p>
              <p className="text-xs text-gray-500 ">August 20, 2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
