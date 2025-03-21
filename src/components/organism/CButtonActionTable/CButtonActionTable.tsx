'use client';

import { useRouterNavigation } from '@/hooks/useRouterNavigation';
import React, { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { deleteJob } from '@/lib/http';
import { useMutation } from '@tanstack/react-query';
import { MoreVertical } from 'lucide-react';

type CButtonActionTableProps = {
  path: string;
  id?: string;
  isDetail?: boolean;
  isDelete?: boolean;
};

const CButtonActionTable: FC<CButtonActionTableProps> = ({
  path,
  id,
  isDetail,
  isDelete,
}) => {
  const [position, setPosition] = React.useState('bottom');
  const { navigate, refresh } = useRouterNavigation();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: async () => {
      await toast({
        title: 'Success',
        description: 'Success delete job',
      });

      return refresh();
    },
    onError: async () => {
      await toast({
        title: 'Error',
        description: 'Failed delete job',
      });
    },
  });

  const handleDeleteJob = () => {
    return mutation.mutate(id!);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'outline'}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuItem onClick={() => navigate(path)}>
            {isDetail ? 'View Resume' : 'View'}
          </DropdownMenuItem>
          {isDelete ? (
            <DropdownMenuItem
              onClick={() => handleDeleteJob()}
              className="text-red-500"
            >
              Delete
            </DropdownMenuItem>
          ) : (
            <></>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CButtonActionTable;
