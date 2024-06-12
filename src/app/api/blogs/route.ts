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
