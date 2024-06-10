import React from "react";
import Image from "next/image";
import ProfileDemo from "@/../public/profile-demo.png";
import CardDemo from "@/../public/blog-card-demo.png";
const BlogCard = () => {
  return (
    <div className="w-[300px] bg-white dark:bg-[#181A2A] rounded-lg overflow-hidden outline-1 outline-offset-8 outline-gray-300 outline-double ">
      <Image
        src={CardDemo}
        alt="Beach"
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
          Technology
        </span>
        <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
          The Impact of Technology on the Workplace: How Technology is Changing
        </h2>
        <div className="mt-4 flex items-center">
          <Image
            src={ProfileDemo}
            alt="Tracey Wilson"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Tracey Wilson
            </p>
            <p className="text-xs text-gray-500">August 20, 2022</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
