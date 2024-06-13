"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const CreateBlog = () => {
  const [todayDate, setTodayDate] = useState("");
  useEffect(() => {
    function getFormattedDate() {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const date = new Date();
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      const latestDate = `${month} ${day} ${year}`;

      setTodayDate(latestDate);
    }

    getFormattedDate();
  }, []);

  return (
    <div className="dark:bg-[#181A2A] dark:text-white">
      <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            What&apos;s on your mind?
          </h1>
        </div>
        <form className="grid gap-8">
          <div className="grid gap-2">
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter a title for your blog post"
              className="bg-[#f3f4f6] dark:bg-[#242535]  outline-none border-none  focus:outline-none focus:border-none"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Main Image</Label>
            <Input
              id="image"
              type="file"
              className="bg-[#f3f4f6] dark:bg-[#242535] cursor-pointer  outline-none border-none  focus:outline-none focus:border-none"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              rows={10}
              placeholder="Start writing your blog post here..."
              className="bg-[#f3f4f6] resize-none  outline-none border-none  focus:outline-none focus:border-none"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="text"
              placeholder="Enter a category"
              className="bg-[#f3f4f6] dark:bg-[#242535]  outline-none border-none  focus:outline-none focus:border-none"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Created on</Label>
            <Input
              id="category"
              type="text"
              value={todayDate}
              disabled={true}
              className="bg-[#f3f4f6] dark:bg-[#242535]"
            />
          </div>
          <Button type="submit" className="w-full md:w-auto">
            Publish Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
