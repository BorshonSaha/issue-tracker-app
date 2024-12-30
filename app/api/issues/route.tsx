import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createIssueSchema } from '@/app/validationSchemas';

export async function POST(request: NextRequest) {
  const requestBody = await request.json();

  const parseResult = createIssueSchema.safeParse(requestBody);

  if (!parseResult.success) {
    return NextResponse.json(parseResult.error.format(), {
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
