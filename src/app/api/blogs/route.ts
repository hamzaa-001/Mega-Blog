import mongoose from "mongoose";
import { DATABASE_URI } from "../../../../connection";
import { NextResponse } from "next/server";
import { Blog } from "@/app/models/blog";

interface ResponseData {
  result: any;
  success: string;
}

export async function GET(): Promise<NextResponse<ResponseData>> {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("DATABASE Connected...");
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ result: null, success: "false" });
  }

  try {
    const data = await Blog.find().exec();
    return NextResponse.json({ result: data, success: "true" });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json({ result: null, success: "false" });
  }
}

export async function POST(req: Request) {
  try {
    // Connect to the database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(DATABASE_URI, {
        //@ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const data = await req.json();
    const {
      blog_imgPath,
      blog_title,
      author,
      blog_content,
      created_at,
      category,
      author_avatar,
    } = data;

    // Create a new blog post
    const newBlog = new Blog({
      blog_imgPath,
      blog_title,
      author,
      blog_content,
      created_at,
      category,
      author_avatar,
    });

    // Save the blog post to the database
    const savedBlog = await newBlog.save();

    // Return success response with the saved blog post data
    return NextResponse.json(
      { success: true, data: savedBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      //@ts-ignore
      { success: false, error: error?.message },
      { status: 400 }
    );
  }
}
