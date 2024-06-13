"use client";

import BlogCard from "../template/BlogCard";
import { useEffect, useState } from "react";
import SkeletonCard from "../template/SkeletonCard";

const LatestBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setAllBlogs(data.result.reverse());
      setIsLoading(false);
    };
    fetchBlogs();
  }, []);
  return (
    <div className="w-full min-h-[100vh] lg:py-10 lg:px-40 px-4">
      <div className="my-8">
        <h1 className="text-2xl font-semibold grid place-items-start">
          All Blogs
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-10 place-items-center pb-10">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : allBlogs.map((blog, index) => (
              <BlogCard
                key={index}
                //@ts-ignore
                id={blog._id}
                //@ts-ignore
                title={blog.blog_title}
                //@ts-ignore
                imgUrl={blog.blog_imgPath}
                //@ts-ignore
                author={blog.author}
                //@ts-ignore
                content={blog.blog_content}
                //@ts-ignore
                createdAt={blog.created_at}
                //@ts-ignore
                category={blog.category}
              />
            ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
