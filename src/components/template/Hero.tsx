"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import MainBlog from "@/../public/main-blog.png";
import ProfileDemo from "@/../public/profile-demo.png";

const Hero = () => {
  const [latestBlog, setLatestBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (isLoading) {
        const response = await fetch(`/api/blogs`);
        const data = await response.json();
        const blogs = data.result;

        const randomBlog = blogs[Math.floor(Math.random() * blogs.length)];
        setLatestBlog(randomBlog);
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [isLoading]);

  return (
    <div className="w-full min-h-[75vh] lg:py-10 py-5 lg:px-40 px-4">
      {isLoading ? (
        <div
          role="status"
          className="flex w-full h-[500px] items-center justify-center bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
        >
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="relative">
          <div className="relative bg-white rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              // @ts-ignore
              src={latestBlog?.blog_imgPath}
              alt="Technology"
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="lg:w-[500px] z-10 bg-white absolute lg:-bottom-10 lg:left-10 -bottom-10 lg:p-8 p-4 rounded-lg shadow-2xl dark:bg-[#151515] dark:text-white mx-8">
            <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full border-[1px]">
              {/* @ts-ignore */}
              {latestBlog?.category}
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {/* @ts-ignore */}
              {latestBlog?.blog_title}
            </h2>
            <div className="mt-4 flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                //@ts-ignore
                src={latestBlog?.author_avatar}
                alt="Author Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {/* @ts-ignore */}
                  {latestBlog?.author ? `${latestBlog?.author}` : "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {/* @ts-ignore */}
                  {latestBlog?.created_at}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
