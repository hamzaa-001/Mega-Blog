"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/utils/uploadthing";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateBlog = () => {
  const [todayDate, setTodayDate] = useState("");
  const [mainImgUrl, setMainImgUrl] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const getFormattedDate = () => {
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
      const formattedDate = `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
      setTodayDate(formattedDate);
    };
    getFormattedDate();
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    category: Yup.string().required("Category is required"),
  });

  const handleSubmit = async (
    values: { title: any; content: any; category: any },
    { resetForm }: any
  ) => {
    const postData = {
      blog_imgPath: mainImgUrl,
      blog_title: values.title,
      author: user?.fullName,
      blog_content: values.content,
      created_at: todayDate,
      category: values.category,
      author_avatar: user?.imageUrl,
      userID: user?.id,
    };

    try {
      await axios.post("/api/blogs", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      resetForm();
      setMainImgUrl("");
      setShowSuccessMsg(true);
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <div className="dark:bg-[#0A0A0A] dark:text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight mb-8 sm:text-4xl md:text-5xl">
          What&apos;s on your mind?
        </h1>
        {showSuccessMsg ? (
          <div className="bg-green-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <span className="text-green-800">Your Blog has been posted</span>
          </div>
        ) : (
          <Formik
            initialValues={{ title: "", content: "", category: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="w-full grid gap-8">
                <div className="grid gap-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Enter a title"
                    className="bg-[#f3f4f6] dark:bg-[#262626] border rounded-md p-2 placeholder:text-sm"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Main Image</Label>
                  <div className="bg-[#f3f4f6] dark:bg-[#262626] border rounded-md p-5">
                    <UploadDropzone
                      className="w-full"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        setMainImgUrl(res[0].url);
                      }}
                      onUploadError={(error) =>
                        alert(`ERROR! ${error.message}`)
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2 quill-container">
                  <Label htmlFor="content">Content</Label>
                  <Field name="content">
                    {({ field }: any) => (
                      <ReactQuill
                        value={field.value}
                        onChange={(value) => setFieldValue("content", value)}
                        className="bg-[#f3f4f6] dark:bg-[#262626] border rounded-md placeholder:text-sm dark:placeholder:text-gray-300"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Field
                    name="category"
                    type="text"
                    placeholder="Enter a category"
                    className="bg-[#f3f4f6] dark:bg-[#262626] border rounded-md p-2 placeholder:text-sm"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="created_at">Created on</Label>
                  <Input
                    id="created_at"
                    type="text"
                    value={todayDate}
                    disabled
                    className="bg-[#f3f4f6] dark:bg-[#262626] border rounded-md p-2"
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Publish Post
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
