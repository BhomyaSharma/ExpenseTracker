import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/config/db";

// ✅ Connect to Database
connectDB();

// ✅ POST /api/auth/signup (User Registration)
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
