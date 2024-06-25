"use client";
import "../globals.css";
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
import { Plus, Trash2, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/utils/uploadthing";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
//@ts-ignore
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Blog {
  _id: string;
  blog_title: string;
  blog_content: string;
  category: string;
  blog_imgPath: string;
  created_at: string;
  result: {};
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

  // Dialogue Values
  const [todayDate, setTodayDate] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [mainImgUrl, setMainImgUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  useEffect(() => {
    if (isSignedIn === false) {
      router.push("/sign-up");
    }
  }, [isSignedIn, router]);

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

  const fetchSelectedBlogData = async (blogId: string) => {
    try {
      const response = await fetch(`/api/blogs/${user?.id}/${blogId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("🚀 ~ fetchSelectedBlogData ~ data:", data);

      setTitle(data.result.blog_title);
      console.log(title);
      setContent(data.result.blog_content);
      setCategory(data.result.category);
      setMainImgUrl(data.result.blog_imgPath);
      setTodayDate(todayDate);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const postData = {
      blog_imgPath: mainImgUrl,
      blog_title: title,
      author: user?.fullName,
      blog_content: content,
      created_at: todayDate,
      category: category,
      author_avatar: user?.imageUrl,
      userID: user?.id,
    };

    try {
      let response;

      if (selectedBlog) {
        // If a blog is selected, update the existing blog
        response = await axios.patch(
          `/api/blogs/${user?.id}/${selectedBlog}`,
          postData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Blog post updated:", response.data);
      } else {
        // If no blog is selected, create a new blog
        response = await axios.post("/api/blogs", postData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Blog post created:", response.data);
      }

      setTitle("");
      setImage(null);
      setContent("");
      setCategory("");
      setSelectedBlog("");
      closeDialog();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
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
                            <Dialog
                              open={isDialogOpen}
                              onOpenChange={setIsDialogOpen}
                            >
                              <DialogTrigger>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedBlog(blog._id);
                                    fetchSelectedBlogData(blog._id);
                                    openDialog();
                                  }}
                                >
                                  <Edit3 className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Make your Edition</DialogTitle>
                                  <DialogDescription>
                                    <div className="grid gap-2 mt-2">
                                      <Label htmlFor="title">Page Title</Label>
                                      <Input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                          setTitle(e.target.value)
                                        }
                                        placeholder="Enter a title"
                                        className="bg-[#f3f4f6] dark:bg-[#262626]  border "
                                      />
                                    </div>
                                    <div className="grid gap-2 mt-2">
                                      <Label htmlFor="title">Main Image</Label>
                                      <div
                                        className="bg-[#f3f4f6] dark:bg-[#262626] flex justify-start px-5 py-5 rounded-md cursor-pointer
           border"
                                      >
                                        <UploadDropzone
                                          className="w-full"
                                          endpoint="imageUploader"
                                          onClientUploadComplete={(res) => {
                                            //@ts-ignore
                                            setMainImgUrl(res[0].url);
                                            console.log("Files: ", res);
                                          }}
                                          onUploadError={(error: Error) => {
                                            alert(`ERROR!${error.message}`);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="grid gap-2 mt-2 quill-container">
                                      <Label htmlFor="title">Content</Label>
                                      <ReactQuill
                                        //@ts-ignore
                                        value={content}
                                        onChange={setContent}
                                        className="h-[300px] bg-[#f3f4f6] dark:bg-[#262626] rounded-lg outline-none  border no-scrollbar"
                                      />
                                    </div>
                                    <div className="grid gap-2 mt-12">
                                      <Label htmlFor="title">Category</Label>
                                      <Input
                                        id="title"
                                        type="text"
                                        value={category}
                                        onChange={(e) =>
                                          setCategory(e.target.value)
                                        }
                                        placeholder="Enter a title"
                                        className="bg-[#f3f4f6] dark:bg-[#262626]  border "
                                      />
                                    </div>
                                    <div className="grid gap-2 mt-2">
                                      <Label htmlFor="created_at">
                                        Last Updated
                                      </Label>
                                      <Input
                                        id="created_at"
                                        type="text"
                                        value={todayDate}
                                        disabled
                                        className="bg-[#f3f4f6] dark:bg-[#262626]  border"
                                      />
                                    </div>
                                    <div className="grid gap-2 mt-2">
                                      <Button
                                        type="submit"
                                        className="w-full md:w-auto"
                                        onClick={handleSubmit}
                                      >
                                        Publish Post
                                      </Button>
                                    </div>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>

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
