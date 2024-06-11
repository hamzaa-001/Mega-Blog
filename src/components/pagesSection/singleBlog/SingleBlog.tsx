"use client";

import Image from "next/image";
import profilePic from "@/../public/profile-demo.png";
import mainImage from "@/../public/main-blog.png";
import { useParams } from "next/navigation";

const SingleBlog = () => {
  const params = useParams();
  console.log("🚀 ~ BlogCard ~ params:", params);
  return (
    <div>
      <div className="text-black dark:text-white p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            Technology
          </span>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
            The Impact of Technology on the Workplace: How Technology is
            Changing
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
              <p>Tracey Wilson</p>
              <p className="text-gray-500">August 20, 2022</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <Image
            src={mainImage}
            alt="Main Image"
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-6 text-gray-500">
          <p>
            Traveling is an exciting experience that opens your horizons,
            exposes you to different cultures, and offers a memorable adventure.
            However, to ensure you make the most of your travels and remain
            safe, it’s crucial to plan and prepare adequately.
          </p>
          <p>
            One of the most rewarding aspects of traveling is immersing yourself
            in the local culture. By researching your destination beforehand,
            understanding the local customs, and learning some basic phrases of
            the native language, you can make your trip more enjoyable and
            meaningful.
          </p>
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Research Your Destination
          </h2>
          <p>
            Before embarking on your journey, take the time to research your
            destination. This includes understanding the local laws, customs,
            climate, and safety tips. Knowing what to expect will help you pack
            appropriately and plan activities that you’ll enjoy.
          </p>
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Plan Your Itinerary
          </h2>
          <p>
            While spontaneity can be part of the joy of travel, having a
            well-thought-out itinerary can help you make the most of your time.
            Ensure you include all the must-see attractions, and also leave some
            time for relaxation and exploration.
          </p>
          <blockquote className="p-4 italic border-l-4 bg-gray-100 dark:bg-gray-900 text-gray-500 border-gray-500 quote">
            “Traveling can expose you to new environments and potential health
            risks. It’s crucial to stay proactive to stay safe and healthy.”
          </blockquote>
          <div className="space-y-6 text-gray-500">
            <p>
              Traveling is an exciting experience that opens your horizons,
              exposes you to different cultures, and offers a memorable
              adventure. However, to ensure you make the most of your travels
              and remain safe, it’s crucial to plan and prepare adequately.
            </p>
            <p>
              One of the most rewarding aspects of traveling is immersing
              yourself in the local culture. By researching your destination
              beforehand, understanding the local customs, and learning some
              basic phrases of the native language, you can make your trip more
              enjoyable and meaningful.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
