import Hero from "@/components/template/Hero";
import LatestBlogs from "@/components/template/LatestBlogs";
const Home = () => {
  return (
    <div className="dark:bg-[#0A0A0A] dark:text-white">
      <Hero />
      <LatestBlogs />
    </div>
  );
};

export default Home;
