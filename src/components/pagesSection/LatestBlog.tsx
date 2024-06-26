"use client";

import React, { useEffect, useState } from "react";

const LatestBlog = () => {
  const [latestBlog, setLatestBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`/api/blogs`);
      const data = await response.json();
      const slug = data.result.pop();
      setLatestBlog(slug);
      setIsLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="w-full min-h-[60vh] lg:py-10 lg:px-40 px-4">
      {isLoading ? (
        <div
          role="status"
          className="flex w-full h-[500px] items-center justify-center bg-gray-300 rounded-lg animate-pulse dark:bg-[#151515]"
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
        <div className="relative w-full bg-transparent text-white rounded-lg overflow-hidden">
          <div className="relative h-[500px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              //@ts-ignore
              src={latestBlog.blog_imgPath}
              alt="Main Image"
              className="relative w-full h-[500px] object-cover z-0"
            />
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>{" "}
            {/* Black overlay */}
            <div className="lg:w-full bottom-0 absolute z-20 p-6 flex flex-col">
              <span className=" max-w-20 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full flex justify-center items-center">
                {/* @ts-ignore */}
                {latestBlog?.category}
              </span>
              <h3 className="lg:w-[60%] w-full mt-4 text-2xl font-semibold text-white dark:text-white">
                {/* @ts-ignore */}
                {latestBlog?.blog_title}
              </h3>
              <div className="mt-4 flex items-center text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  //@ts-ignore
                  src={latestBlog?.author_avatar}
                  alt="Profile Pic"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-2">
                  <p>
                    {/* @ts-ignore */}
                    {latestBlog?.author ? `${latestBlog?.author}` : "Anonymous"}
                  </p>
                  <p className="text-gray-300">
                    {/* @ts-ignore */}
                    {latestBlog?.created_at}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestBlog;
