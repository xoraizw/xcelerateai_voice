import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generatePublicId } from "@/lib/utils";

// POST - Create a new demo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, prompt, apiKey, vapiConfig } = body;

    if (!name || !prompt) {
      return NextResponse.json(
        { error: "Name and prompt are required" },
        { status: 400 }
      );
    }

    const publicId = generatePublicId();

    const demo = await prisma.demo.create({
      data: {
        name,
        prompt,
        publicId,
        apiKey,
        vapiConfig,
      },
    });

    return NextResponse.json(demo, { status: 201 });
  } catch (error) {
    console.error("Error creating demo:", error);
    return NextResponse.json(
      { error: "Failed to create demo" },
      { status: 500 }
    );
  }
}

// GET - List all demos (optional, for admin)
export async function GET() {
  try {
    const demos = await prisma.demo.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json(demos);
  } catch (error) {
    console.error("Error fetching demos:", error);
    return NextResponse.json(
      { error: "Failed to fetch demos" },
      { status: 500 }
    );
  }
}
