import LatestBlog from "@/components/pagesSection/LatestBlog";
import AllBlogs from "@/components/pagesSection/AllBlogs";

const AllBlogsPage = () => {
  return (
    <div className="dark:bg-[#0A0A0A] dark:text-white">
      <div className="flex justify-center items-center flex-col py-5 dark:bg-[#0A0A0A] dark:text-white">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <p className="text-xs">Home | All Blogs</p>
      </div>
      <LatestBlog />
      <AllBlogs />
    </div>
  );
};

export default AllBlogsPage;
