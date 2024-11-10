import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

export async function PUT(req) {
  //connecting to dB from new api endpoint created in the profile.js
  await mongoose.connect(process.env.MONGO_URL);
  //to grab the data
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user.email; //the unique identifier to update the name.

    //saving to the User dB

    

    filter = {email}
  }

  const userData = { name, image };

  const user = await User.findOne(filter)
    await User.updateOne(filter, userData);
    await UserInfo.findOneAndUpdate({email:user.email}, otherUserInfo, { upsert: true });


  return Response.json(true);
}

export async function GET(req) {
  //connecting to dB
  await mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id')

  let filterUser = {}
  if(_id) {
    filterUser = {_id}
  } else {
    const session = await getServerSession(authOptions);
  const email = session?.user.email;
  
  if (!email) {
    return Response.json({});
  }
  filterUser = {email}
  
  }
  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({ email:user.email }).lean();

  return Response.json({ ...user, ...userInfo });
  
}
