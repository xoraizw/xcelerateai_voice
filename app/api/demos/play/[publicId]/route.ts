import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Check and increment play count
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await params;

    // Get current demo
    const demo = await prisma.demo.findUnique({
      where: { publicId },
      select: { id: true, playCount: true, maxPlays: true },
    });

    if (!demo) {
      return NextResponse.json(
        { error: "Demo not found" },
        { status: 404 }
      );
    }

    // Check if demo has plays remaining
    if (demo.playCount >= demo.maxPlays) {
      return NextResponse.json(
        { 
          error: "Demo limit reached",
          playCount: demo.playCount,
          maxPlays: demo.maxPlays,
          playsRemaining: 0
        },
        { status: 403 }
      );
    }

    // Increment play count
    const updatedDemo = await prisma.demo.update({
      where: { id: demo.id },
      data: {
        playCount: {
          increment: 1,
        },
      },
      select: { playCount: true, maxPlays: true },
    });

    return NextResponse.json({
      success: true,
      playCount: updatedDemo.playCount,
      maxPlays: updatedDemo.maxPlays,
      playsRemaining: updatedDemo.maxPlays - updatedDemo.playCount,
    });
  } catch (error) {
    console.error("Error incrementing play count:", error);
    return NextResponse.json(
      { error: "Failed to start call" },
      { status: 500 }
    );
  }
}

// GET - Get current play count
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await params;

    const demo = await prisma.demo.findUnique({
      where: { publicId },
      select: { playCount: true, maxPlays: true },
    });

    if (!demo) {
      return NextResponse.json(
        { error: "Demo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      playCount: demo.playCount,
      maxPlays: demo.maxPlays,
      playsRemaining: demo.maxPlays - demo.playCount,
    });
  } catch (error) {
    console.error("Error fetching play count:", error);
    return NextResponse.json(
      { error: "Failed to fetch play count" },
      { status: 500 }
    );
  }
}
