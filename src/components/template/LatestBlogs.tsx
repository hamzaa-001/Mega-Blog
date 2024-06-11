import Link from "next/link";
import { Button } from "../ui/button";
import BlogCard from "./BlogCard";

const LatestBlogs = () => {
  const blogs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="w-full min-h-[100vh] lg:py-10 lg:px-40 px-4">
      <div className="my-8">
        <h1 className="text-2xl font-semibold grid place-items-center lg:place-items-start">
          Latest Blogs
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-10 place-items-center">
        {blogs.map((blog, index) => (
          <BlogCard key={index} />
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
