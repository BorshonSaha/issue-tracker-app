import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/client';

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const requestBody = await request.json();

  const parseResult = createIssueSchema.safeParse(requestBody);

  if (!parseResult.success) {
    return NextResponse.json(parseResult.error.issues, {
      status: 400,
    });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: parseResult.data.title,
      description: parseResult.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
