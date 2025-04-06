import CApplicantTabs from '@/components/organism/CApplicantTabs/CApplicantTabs';
import CJobDetailTabs from '@/components/organism/CJobDetailTabs/CJobDetailTabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getResumeFileUrl } from '@/lib/utils';
import { ArrowLeftIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '../../../../../lib/prisma';

export const metadata: Metadata = {
  title: 'Dashboard | Job Detail',
};

type JobDetailProps = {
  params: Promise<{ id: string }>;
};

async function getDetailJob(id: string) {
  const job = await prisma.job.findFirst({
    where: {
      id: id,
    },
    include: {
      applicant: {
        include: {
          user: true,
        },
      },
      CategoryJob: true,
    },
  });

  return job;
}

export default async function JobDetailPage({ params }: JobDetailProps) {
  const { id } = await params;

  const job = await getDetailJob(id);
  const fileName = await getResumeFileUrl(job?.applicant);

  return (
    <div>
      <div className="inline-flex items-center gap-5 mb-5">
        <div>
          <Link href={'/job-listings'}>
            <ArrowLeftIcon className="w-9 h-9" />
          </Link>
        </div>

        <div>
          <div className="text-2xl font-semibold mb-1">{job?.roles}</div>
          <div>
            {job?.CategoryJob?.name} . {job?.jobType} . {job?.applicants} / {''}
            {job?.needs} Hired
          </div>
        </div>
      </div>

      <Tabs defaultValue="applicants">
        <TabsList className="mb-8">
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="jobDetails">Job Details</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <CApplicantTabs applicants={job?.applicant} fileName={fileName} />
        </TabsContent>
        <TabsContent value="jobDetails">
          <CJobDetailTabs detail={job} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
