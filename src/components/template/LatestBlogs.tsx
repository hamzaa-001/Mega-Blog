import BlogCard from "./BlogCard";

const LatestBlogs = () => {
  return (
    <div className="w-full min-h-[100vh] py-10 px-40 ">
      <div className="my-8">
        <h1 className="text-2xl">Latest Blogs</h1>
      </div>
      <BlogCard />
    </div>
  );
};

export default LatestBlogs;
