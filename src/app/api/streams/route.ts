import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../DB/db.config";
const YT_REGEX = new RegExp("^https://www..youtube.com/watch?v=[w-]{11}$");

const createStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const data = createStreamSchema.parse(await req.json());
    const isYT = YT_REGEX.test(data.url);
    if (!isYT) {
      return NextResponse.json(
        {
          message: "wrong url format",
        },
        { status: 411 }
      );
    }
    const extractedid = data.url.split("?v=")[1];
    await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extracted_id: extractedid,
        type: "Youtube",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "error doing stream upvote",
      },
      {
        status: 411,
      }
    );
  }
}
