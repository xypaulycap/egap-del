import bcrypt from 'bcryptjs';
import { User } from "@/models/User";
import mongoose from "mongoose";

export async function POST(req) {
  //parsing the body request
  const body = await req.json();
  //to save a user to the dB using mongoose
  await mongoose.connect(process.env.MONGO_URL); //connecting to dB
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error("password must be at least 5 characters");
  }

  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);
  body.password = hashedPassword;

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
