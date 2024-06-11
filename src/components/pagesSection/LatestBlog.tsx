import React from "react";
import Image from "next/image";
import profilePic from "@/../public/profile-demo.png";
import mainImage from "@/../public/main-blog.png";

const LatestBlog = () => {
  return (
    <div className="w-full min-h-[60vh] lg:py-10 lg:px-40 px-4">
      <div className="relative w-full bg-gray-900 text-white rounded-lg overflow-hidden">
        <div className="relative h-[500px]">
          <Image
            src={mainImage}
            alt="Main Image"
            className="relative w-full h-[500px] object-cover z-0"
          />
          <div className="lg:w-[700px] bottom-0 absolute z-10 p-6  flex flex-col">
            <span className="inline-block max-w-20 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              Technology
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-white dark:text-white">
              The Impact of Technology on the Workplace: How Technology is
              Changing
            </h3>
            <div className="mt-4 flex items-center text-sm">
              <Image
                src={profilePic}
                alt="Profile Pic"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div className="ml-2">
                <p>Tracey Wilson</p>
                <p className="text-gray-300">August 20, 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
