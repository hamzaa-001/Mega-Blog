"use client";

import Image from "next/image";
import profilePic from "@/../public/profile-demo.png";
import mainImage from "@/../public/main-blog.png";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

//@ts-ignore
const formatBlogContent = (content) => {
  content = content.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  content = content.replace(/\*(.*?)\*/g, "<i>$1</i>");

  content = content.replace(/~~/g, "<br />");

  return content;
};

const SingleBlog = () => {
  const params = useParams();
  const id = params.id;
  const [singleBlog, setSingleBlog] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`/api/blogs/${id}`);
      const data = await response.json();
      setSingleBlog(data.result);
    };
    fetchBlogs();
  }, []);

  console.log("🚀 ~ SingleBlog ~ singleBlog:", singleBlog);
  //@ts-ignore
  const { blog_title, blog_content, author, created_at, blog_imgPath } =
    singleBlog;
  return (
    <>
      {blog_imgPath ? (
        <div>
          <div className="text-black dark:text-white p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                Technology
              </span>
              <h1 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                {blog_title}
              </h1>
              <div className="mt-4 flex items-center text-sm">
                <Image
                  src={profilePic}
                  alt="Profile Pic"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div className="ml-2">
                  <p>{author}</p>
                  <p className="text-gray-500">{created_at}</p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog_imgPath}
                className="w-[800px] h-[400px] rounded-lg"
              />
            </div>
            <div
              className="space-y-6 text-gray-500"
              dangerouslySetInnerHTML={{
                __html: formatBlogContent(blog_content),
              }}
            ></div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default SingleBlog;
