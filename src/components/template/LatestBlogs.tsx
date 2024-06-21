"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";

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
        <h1 className="text-2xl font-semibold grid place-items-center lg:place-items-start">
          Latest Blogs
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-10 place-items-center">
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
                //@ts-ignore
                author_avatar={blog.author_avatar}
              />
            ))}
      </div>
      <div className="flex items-center justify-center mt-10">
        <Link href={"/all-blogs"}>
          <Button
            variant="outline"
            className="dark:bg-[#181A2A] dark:hover:bg-[#242535]"
          >
            View All Blogs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestBlogs;
