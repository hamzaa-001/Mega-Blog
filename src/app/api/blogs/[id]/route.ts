import mongoose from "mongoose";
import { DATABASE_URI } from "../../../../../connection";
import { NextResponse } from "next/server";
import { Blog } from "@/app/models/blog";
interface ResponseData {
  result: any;
  success: string;
}

//@ts-ignore
export async function GET(req, res) {
  const { pathname } = new URL(req.url);
  const userID = pathname.split("/").pop();
  console.log("🚀 ~ GET ~ userID:", userID);

  try {
    await mongoose.connect(DATABASE_URI);
    console.log("DATABASE Connected...");
  } catch (error) {
    console.error("Error connecting to database:", error);
    return res.json({ result: null, success: false });
  }

  try {
    const data = await Blog.find({ userID }).exec();
    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json({ result: null, success: false });
  }
}
