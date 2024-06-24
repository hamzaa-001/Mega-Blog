//@ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus, Trash2, Edit3 } from "lucide-react"; // Import the Edit3 icon
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  blog_title: string;
  created_at: string;
}

interface ApiResponse {
  result: Blog[];
  recentBlogs: Blog[];
}

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<string>("");
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn === false) {
      router.push("/sign-up");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(`/api/blogs/${user?.id}`);
        const data: ApiResponse = await response.json();
        console.log("🚀 ~ fetchBlogs ~ data:", data);
        setBlogs(data?.result);
        setRecentBlogs(data.result);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    if (user) {
      fetchBlogs();
    }
  }, [user]);

  const handleDeleteBlog = async () => {
    if (!selectedBlog) return;

    try {
      const response = await fetch(`/api/blogs/${user?.id}/${selectedBlog}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== selectedBlog)
        );
        setRecentBlogs((prevRecentBlogs) =>
          prevRecentBlogs.filter((blog) => blog._id !== selectedBlog)
        );
        setSelectedBlog("");
      } else {
        console.error("Failed to delete the blog");
      }
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    router.push({
      pathname: "/create-blog",
      query: {
        id: blog._id,
        title: blog.blog_title,
        created_at: blog.created_at,
        // Add any other fields you want to pre-fill
      },
    });
  };

  return (
    <div className="grid min-h-screen w-full overflow-hidden">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 ">
          {blogs.length === 0 ? (
            <div className="flex flex-col gap-4 justify-center items-center h-full">
              <p className="text-muted-foreground text-xl ">
                You haven&apos;t posted anything.
              </p>
              <Link href={"/create-blog"}>
                <Button variant="outline">
                  <Plus className="mr-1 w-4 h-4" />
                  Create New
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="w-full h-[100px] flex flex-col justify-center items-center  gap-3 my-10">
                <h1 className="text-lg">
                  Manage, Track, and Optimize Your Content
                </h1>
                <Link href={"/create-blog"}>
                  <Button variant="outline">
                    <Plus className="mr-1 w-4 h-4" />
                    Create New
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle className="mb-2">Total Blogs</CardTitle>
                    <Badge className="flex justify-center items-center bg-primary text-primary-foreground w-16 h-16 text-2xl">
                      {blogs?.length}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">
                      The total number of blogs you have posted.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle>Recent Blogs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBlogs?.slice(0, 2).map((blog) => (
                        <div
                          key={blog._id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <h4 className="font-medium">{blog.blog_title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(blog.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditBlog(blog)}
                            >
                              <Edit3 className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedBlog(blog._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle>Delete Blog</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        Select a blog from the Recent Blogs list to delete.
                      </p>
                      <Select
                        onValueChange={(value) => setSelectedBlog(value)}
                        value={selectedBlog}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a blog" />
                        </SelectTrigger>
                        <SelectContent>
                          {blogs?.map((blog) => (
                            <SelectItem key={blog._id} value={blog._id}>
                              {blog.blog_title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteBlog}
                        disabled={!selectedBlog}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete Blog
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
