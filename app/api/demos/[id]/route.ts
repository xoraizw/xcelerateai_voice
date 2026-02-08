import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get a specific demo by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const demo = await prisma.demo.findUnique({
      where: { id },
    });

    if (!demo) {
      return NextResponse.json(
        { error: "Demo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(demo);
  } catch (error) {
    console.error("Error fetching demo:", error);
    return NextResponse.json(
      { error: "Failed to fetch demo" },
      { status: 500 }
    );
  }
}

// PUT - Update a demo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, prompt, firstMessage } = body;

    if (!name || !prompt) {
      return NextResponse.json(
        { error: "Name and prompt are required" },
        { status: 400 }
      );
    }

    const demo = await prisma.demo.update({
      where: { id },
      data: {
        name,
        prompt,
        firstMessage,
      },
    });

    return NextResponse.json(demo);
  } catch (error) {
    console.error("Error updating demo:", error);
    return NextResponse.json(
      { error: "Failed to update demo" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a demo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.demo.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting demo:", error);
    return NextResponse.json(
      { error: "Failed to delete demo" },
      { status: 500 }
    );
  }
}
