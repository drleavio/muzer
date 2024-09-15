import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../../DB/db.config";

const upVoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        message: "user unauthenticated",
      },
      { status: 403 }
    );
  }

  try {
    const data = upVoteSchema.parse(await req.json());
    await prisma.upvote.create({
      data: {
        userId: user.id,
        streamId: data.streamId,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "error while upvoting",
      },
      { status: 403 }
    );
  }
}
