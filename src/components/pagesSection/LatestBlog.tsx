"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import profilePic from "@/../public/profile-demo.png";
import mainImage from "@/../public/main-blog.png";

const LatestBlog = () => {
  const [latestBlog, setLatestBlog] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`/api/blogs`);
      const data = await response.json();
      const slug = data.result.pop();
      setLatestBlog(slug);
    };
    fetchBlogs();
  }, []);

  console.log("🚀 ~ Hero ~ latestBlog:", latestBlog);
  return (
    <div className="w-full min-h-[60vh] lg:py-10 lg:px-40 px-4">
      <div className="relative w-full bg-transparent text-white rounded-lg overflow-hidden">
        <div className="relative h-[500px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            //@ts-ignore
            src={latestBlog.blog_imgPath}
            alt="Main Image"
            className="relative w-full h-[500px] object-cover z-0"
          />
          <div className="lg:w-full bottom-0 absolute z-10 p-6  flex flex-col ">
            <span className="inline-block max-w-20 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              Technology
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-white dark:text-white">
              {/* @ts-ignore */}
              {latestBlog?.blog_title}
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
                {/* @ts-ignore */}
                <p>{latestBlog?.author}</p>
                <p className="text-gray-300">
                  {/* @ts-ignore */}
                  {latestBlog?.created_at}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
