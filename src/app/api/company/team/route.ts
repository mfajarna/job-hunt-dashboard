import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function POST(request: Request) {
  const data = await request.json();

  const result = await prisma.companyTeam.create({
    data: {
      name: data.name,
      position: data.position,
      instagram: data.instagram,
      linkedin: data.linkedin,
      companyId: data.companyId,
    },
  });

  return NextResponse.json(result);
}
