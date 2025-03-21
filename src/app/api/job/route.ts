import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
  const data = await request.json();

  const result = await prisma.job.create({
    data,
  });

  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  const jobId = searchParams.get('id'); // Assume the ID is passed as a query parameter

  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }

  try {
    const deletedJob = await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    return NextResponse.json({
      message: 'Job deleted successfully',
      data: deletedJob,
    });
  } catch (error) {
    console.error('Error deleting job:', error);

    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
