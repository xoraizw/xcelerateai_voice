import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DemoPage from "@/components/DemoPage";

interface DemoPageProps {
  params: Promise<{
    publicId: string;
  }>;
}

export default async function Demo({ params }: DemoPageProps) {
  const { publicId } = await params;

  const demo = await prisma.demo.findUnique({
    where: {
      publicId,
    },
  });

  if (!demo) {
    notFound();
  }

  return <DemoPage demo={demo} />;
}

export async function generateMetadata({ params }: DemoPageProps) {
  const { publicId } = await params;
  
  const demo = await prisma.demo.findUnique({
    where: {
      publicId,
    },
  });

  return {
    title: demo ? `${demo.name} - XcelerateAI Demo` : "Demo Not Found",
    description: demo ? `Try out our ${demo.name} AI calling agent powered by XcelerateAI` : "Demo not found",
  };
}
