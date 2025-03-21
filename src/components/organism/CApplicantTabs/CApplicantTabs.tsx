'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { JOB_APPLICANT_COLUMNS } from '@/constants';
import { toast } from '@/hooks/use-toast';
import { useRouterNavigation } from '@/hooks/useRouterNavigation';
import { updateApplicant } from '@/lib/http';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import CButtonActionTable from '../CButtonActionTable/CButtonActionTable';

type ApplicantsProps = {
  applicants: any;
  fileName: string;
};

const CApplicantTabs: FC<ApplicantsProps> = ({ applicants, fileName }) => {
  const { refresh } = useRouterNavigation();

  const mutation = useMutation({
    mutationFn: updateApplicant,
    onSuccess: async (data) => {
      await toast({
        title: 'Success',
        description: 'Edit status success',
      });

      await refresh();
    },
    onError: async (err) => {
      await toast({
        title: 'Error',
        description: 'Edit status error',
      });
    },
  });

  const handleUpdate = (val: { id: string; statusApply: string }) => {
    const bodyArgs = {
      id: val.id,
      statusApply: val.statusApply,
    };

    mutation.mutate(bodyArgs);
  };

  return (
    <Table>
      <TableCaption>A list of your recent applicants.</TableCaption>

      <TableHeader>
        <TableRow>
          {JOB_APPLICANT_COLUMNS.map((item: any, index: number) => (
            <TableHead key={index}>{item}</TableHead>
          ))}

          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants && (
          <>
            {applicants.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{item.user.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.previousJobTitle}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(val) => {
                      handleUpdate({
                        id: item.id,
                        statusApply: val,
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={item.statusApply} />
                    </SelectTrigger>
                    <SelectContent>
                      {item.statusApply === 'wait for review' ? (
                        <>
                          <SelectItem value="on review">on review</SelectItem>
                          <SelectItem value="hired">hired</SelectItem>
                          <SelectItem value="expired">expired</SelectItem>
                        </>
                      ) : item.statusApply === 'on review' ? (
                        <>
                          <SelectItem value="hired">hired</SelectItem>
                          <SelectItem value="expired">expired</SelectItem>
                        </>
                      ) : item.statusApply === 'hired' ? (
                        <>
                          <SelectItem value="expired">expired</SelectItem>
                        </>
                      ) : item.statusApply === 'expired' ? (
                        <>
                          <SelectItem value="expired" disabled>
                            expired
                          </SelectItem>
                        </>
                      ) : (
                        <></>
                      )}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <CButtonActionTable path={fileName} isDetail />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
};

export default CApplicantTabs;
