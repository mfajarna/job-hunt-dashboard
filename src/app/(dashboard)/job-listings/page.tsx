import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CButtonActionTable from '@/components/organism/CButtonActionTable/CButtonActionTable';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { JOB_LISTING_COLUMNS } from '@/constants';
import { dateFormat } from '@/lib/utils';
import moment from 'moment';
import { getServerSession } from 'next-auth';
import { FC } from 'react';
import prisma from '../../../../lib/prisma';

type JobListingsProps = {};

async function getDataJobs() {
  const session = await getServerSession(authOptions);

  const jobs = prisma.job.findMany({
    where: {
      companyId: session?.user.id,
    },
  });

  return jobs;
}

const JobListingsPage: FC<JobListingsProps> = async ({}) => {
  const jobs = await getDataJobs();

  return (
    <div>
      <div className="font-semibold text-3xl">Job Listings</div>

      <div className="mt-10">
        <Table>
          <TableCaption>A list of your recent job listings.</TableCaption>

          <TableHeader>
            <TableRow>
              {JOB_LISTING_COLUMNS.map((item: any, index: number) => (
                <TableHead key={index}>{item}</TableHead>
              ))}

              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  {/* */}
                  {moment(item.datePosted).isBefore(item.dueDate) ? (
                    <Badge className="bg-blue-500">Live</Badge>
                  ) : (
                    <Badge variant={'destructive'}>Expired</Badge>
                  )}
                </TableCell>
                <TableCell>{dateFormat(item.datePosted)}</TableCell>
                <TableCell>{dateFormat(item.dueDate)}</TableCell>
                <TableCell>
                  <Badge variant={'outline'}>{item.jobType}</Badge>
                </TableCell>
                <TableCell>{item.applicants}</TableCell>
                <TableCell>
                  {item.applicants} / {item.needs}
                </TableCell>
                <TableCell>
                  <CButtonActionTable
                    path={`/job-detail/${item.id}`}
                    id={item.id}
                    isDelete
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobListingsPage;
