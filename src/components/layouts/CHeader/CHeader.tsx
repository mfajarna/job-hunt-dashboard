'use client';

import { Button } from '@/components/ui/button';
import { useRouterNavigation } from '@/hooks/useRouterNavigation';
import { PlusIcon } from 'lucide-react';
import { FC } from 'react';

type CHeaderProps = {
  detailCompany: any;
};

const CHeader: FC<CHeaderProps> = ({ detailCompany }) => {
  const { navigate } = useRouterNavigation();

  const companyOverview = detailCompany?.CompanyOverview
    ? detailCompany?.CompanyOverview[0]
    : '';

  const navToPostJob = () => navigate('/post-a-job');

  return (
    <div className="pb-3 mb-8 border-b border-border flex flex-row items-center justify-between">
      <div>
        <div>Company</div>
        <div className="font-semibold">
          {detailCompany?.CompanyOverview[0]
            ? detailCompany.CompanyOverview[0].companyName
            : '------'}
        </div>
      </div>
      <div>
        <Button className="rounded-none py-3 px-6" onClick={navToPostJob}>
          <PlusIcon className="mr-2 w-4 h-4" />
          Post a Job
        </Button>
      </div>
    </div>
  );
};

export default CHeader;
