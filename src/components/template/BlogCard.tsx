//@ts-nocheck
"use client";
import React from "react";
import Image from "next/image";
import ProfileDemo from "@/../public/profile-demo.png";
import Link from "next/link";

const BlogCard = ({
  title,
  imgUrl,
  author,
  createdAt,
  id,
  category,
  author_avatar,
}) => {
  return (
    <>
      <div className="w-[300px] p-2 bg-white dark:bg-[#181A2A] rounded-lg overflow-hidden outline-1 outline-offset-8 outline-gray-300 outline-double dark:outline-gray-700">
        <Link href={`/blog/${id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgUrl}
            alt="Beach"
            className="w-full h-[192px] object-cover rounded-lg"
          />
          <div className="p-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
              {category}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <div className="mt-4 flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={author_avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {author ? `${author}` : "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">{createdAt}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BlogCard;
