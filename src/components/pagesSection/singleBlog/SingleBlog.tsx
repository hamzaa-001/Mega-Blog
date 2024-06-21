"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./singleBlog.css";

const SingleBlog = () => {
  const params = useParams();
  const id = params.id;
  const [singleBlog, setSingleBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        const data = await response.json();
        setSingleBlog(data.result);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!singleBlog) {
    return <div className="w-full h-screen"></div>;
  }

  const {
    blog_title,
    blog_content,
    author,
    created_at,
    blog_imgPath,
    category,
    author_avatar,
  } = singleBlog;

  return (
    <div>
      <div className="text-black dark:text-white p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </span>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
            {blog_title}
          </h1>
          <div className="mt-4 flex items-center text-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author_avatar}
              alt="Profile Pic"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-2">
              <p>{author ? `${author}` : "Anonymous"}</p>
              <p className="text-gray-500">{created_at}</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog_imgPath}
            className="w-[800px] h-[400px] rounded-lg"
            alt="main-img"
          />
        </div>
        <div
          className="space-y-6 text-gray-400 dangerous-div"
          dangerouslySetInnerHTML={{ __html: blog_content }}
        ></div>
      </div>
    </div>
  );
};

export default SingleBlog;
