import Hero from "@/components/template/Hero";
import LatestBlogs from "@/components/template/LatestBlogs";
const Home = () => {
  return (
    <div className="dark:bg-[#181A2A] dark:text-white">
      <Hero />
      <LatestBlogs />
    </div>
  );
};

export default Home;
