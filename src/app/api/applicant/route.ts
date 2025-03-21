import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const applicantId = searchParams.get('id');

  const data = await req.json();

  if (!applicantId) {
    return NextResponse.json(
      { error: 'Applicant id is required' },
      { status: 400 }
    );
  }

  try {
    const updateApplicant = await prisma.applicant.update({
      where: {
        id: applicantId,
      },
      data: {
        statusApply: data.statusApply,
      },
    });

    return NextResponse.json({
      messsage: 'Update status success',
      data: updateApplicant,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to delete applicant' },
      { status: 500 }
    );
  }
}
