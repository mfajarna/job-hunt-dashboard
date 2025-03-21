import CCardDashboard from '@/components/organism/CCardDashboard';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { authOptions } from '../api/auth/[...nextauth]/route';

const getDataStatistic = async () => {
  const session = await getServerSession(authOptions);
  const companyId = session?.user.id;

  const applicant = await prisma.applicant.count({
    where: {
      job: {
        companyId,
      },
    },
  });

  const applicantToReview = await prisma.applicant.count({
    where: {
      job: {
        companyId,
      },
      statusApply: 'wait to review',
    },
  });

  const totalJobs = await prisma.job.count({
    where: {
      companyId,
    },
  });

  return {
    applicant,
    applicantToReview,
    totalJobs,
  };
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { applicant, applicantToReview, totalJobs } = await getDataStatistic();

  return (
    <div>
      <div className="font-semibold text-2xl">
        Welcome back, {session?.user.name ?? '---'}
      </div>
      <div className="text-sm text-muted-foreground">
        Here's the dashboard analytic for your company
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-3">
          <CCardDashboard
            total={applicantToReview.toString()}
            title="Aplicants wait to review"
            path={'/all-aplicants'}
          />
          <CCardDashboard
            total={totalJobs.toString()}
            title="Total Jobs"
            path={'/job-listings'}
          />
          <CCardDashboard
            total={applicant.toString()}
            title="Total Applicants"
            path={'/all-aplicants'}
          />
        </div>
      </div>
    </div>
  );
}
