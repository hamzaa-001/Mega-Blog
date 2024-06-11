import { Button } from "../ui/button";
import BlogCard from "../template/BlogCard";

const LatestBlogs = () => {
  const blogs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="w-full min-h-[100vh] lg:py-10 lg:px-40 px-4">
      <div className="my-8">
        <h1 className="text-2xl font-semibold grid place-items-center">
          Latest Blogs
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-10 place-items-center pb-10">
        {blogs.map((blog, index) => (
          <BlogCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
