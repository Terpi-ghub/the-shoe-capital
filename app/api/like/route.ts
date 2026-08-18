import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId, action, userId } = await req.json();

    // Stop anyone who isn't logged in
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    if (action === "like") {
      // Add the user's ID to the array
      await writeClient.patch(postId)
        .setIfMissing({ likedBy: [] })
        .append("likedBy", [userId])
        .commit();
    } else {
      // Remove the user's ID from the array
      await writeClient.patch(postId)
        .unset([`likedBy[@ == "${userId}"]`])
        .commit();
    }

    return NextResponse.json({ message: "Like updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ SANITY LIKE ERROR:", error);
    return NextResponse.json({ message: "Error updating like" }, { status: 500 });
  }
}