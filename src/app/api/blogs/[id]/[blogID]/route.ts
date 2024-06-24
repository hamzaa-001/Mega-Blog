import mongoose from "mongoose";
import { DATABASE_URI } from "../../../../../../connection";
import { NextResponse } from "next/server";
import { Blog } from "@/app/models/blog";

export async function GET(req: any, res: any) {
  const { pathname } = new URL(req.url);

  const slug = pathname.split("/").pop();

  try {
    await mongoose.connect(DATABASE_URI);
    console.log("DATABASE Connected...");
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ result: null, success: false });
  }

  try {
    const data = await Blog.findById(slug).exec();
    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json({ result: null, success: false });
  }
}

export async function DELETE(req: any, res: any) {
  const { pathname } = new URL(req.url);
  const slug = pathname.split("/").pop();

  try {
    await mongoose.connect(DATABASE_URI);
    console.log("DATABASE Connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json({
      success: false,
      error: "Database connection error",
    });
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(slug).exec();
    if (!deletedBlog) {
      console.error("Blog not found for deletion:", slug);
      return NextResponse.json({ success: false, error: "Blog not found" });
    }
    console.log("Blog deleted successfully:", slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, error: "Error deleting blog" });
  }
}
