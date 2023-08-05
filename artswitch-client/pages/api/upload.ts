import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let img: Record<string, string | number> = {};
  const body = JSON.parse(req.body) || {};
  const { file } = body;

  const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  try {
    await cloudinary.uploader
      .upload(file, {
        api_key: API_KEY,
        cloud_name: CLOUD_NAME,
        api_secret: API_SECRET,
        folder: "art-switch",
      })
      .then(res => (img = res));

    res.status(200).json({ res: img });
  } catch (error) {
    res.status(500).json({ error });
  }
}
