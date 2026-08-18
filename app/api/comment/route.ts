import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, comment, postId } = await req.json();

    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    await writeClient.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: postId,
      },
      name,
      email,
      comment,
      approved: false, // Hidden until you approve it in the Studio!
    });

    return NextResponse.json({ message: "Comment submitted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error submitting comment" }, { status: 500 });
  }
}