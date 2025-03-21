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
import { JOB_LISTING_ALL_ALPLICANTS } from '@/constants';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';

type AllAplicantsProps = {};

async function getDataApplicants() {
  const session = await getServerSession(authOptions);
  const companyId = session?.user.id;

  const applicants = await prisma.applicant.findMany({
    include: {
      job: {
        where: {
          companyId,
        },
      },
      user: true,
    },
  });

  return applicants;
}

const AllAplicantsPage: React.FC<AllAplicantsProps> = async () => {
  const applicants = await getDataApplicants();

  return (
    <div>
      <div className="font-semibold text-3xl">All Aplicants</div>

      <div className="mt-10">
        <Table>
          <TableCaption>A list of all aplicants submitted.</TableCaption>
          <TableHeader>
            <TableRow>
              {JOB_LISTING_ALL_ALPLICANTS.map((item: string, index: number) => (
                <TableHead key={index} className="text-center">
                  {item}
                </TableHead>
              ))}

              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applicants && (
              <>
                {applicants.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.user?.name}</TableCell>
                    <TableCell>{item.user?.email}</TableCell>
                    <TableCell className="text-center">{item.phone}</TableCell>
                    <TableCell className="text-center">
                      {item.statusApply === 'wait for review' ||
                      item.statusApply === 'hired' ||
                      item.statusApply === 'on review' ? (
                        <Badge className="bg-blue-500">
                          {item.statusApply}
                        </Badge>
                      ) : (
                        <Badge variant={'destructive'}>
                          {item.statusApply}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.job?.roles}
                    </TableCell>
                    <TableCell>
                      <CButtonActionTable
                        path={`/job-detail/${item.job?.id}`}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllAplicantsPage;
