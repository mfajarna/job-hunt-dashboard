import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function POST(request: Request) {
  const data = await request.json();

  const findSocial = await prisma.companySocialMedia.findFirst({
    where: {
      companyId: data.companyId,
    },
  });

  const result = await prisma.companySocialMedia.upsert({
    where: {
      companyId: data.companyId,
      id: findSocial?.id || '',
    },
    update: data,
    create: data,
  });

  return NextResponse.json(result);
}
