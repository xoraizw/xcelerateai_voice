import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Reset play count for a demo
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Reset play count to 0
    const demo = await prisma.demo.update({
      where: { id },
      data: {
        playCount: 0,
      },
    });

    return NextResponse.json({
      success: true,
      playCount: demo.playCount,
      maxPlays: demo.maxPlays,
    });
  } catch (error) {
    console.error("Error resetting play count:", error);
    return NextResponse.json(
      { error: "Failed to reset play count" },
      { status: 500 }
    );
  }
}
