'use client';

import CFieldInput from '@/components/organism/CFieldInput/CFieldInput';
import { Badge } from '@/components/ui/badge';
import { CompanyTeam } from '@prisma/client';
import { InstagramIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import CDialogAddTeam from './components/DialogAddTeam/CDialogAddTeam';

type CFormTeamProps = {
  detail: CompanyTeam[] | undefined;
  count: number | undefined;
};

const CTeamForm: React.FC<CFormTeamProps> = ({ detail, count }) => {
  return (
    <CFieldInput
      title="Basic Information"
      subTitle="Add team members of your company"
    >
      <div className="w-[65%] mb-5">
        <div className="flex flex-row justify-between items-center">
          <div className="text-lg font-semibold">{count} Members</div>

          <CDialogAddTeam />
        </div>

        <div className="grid grid-cols-3 gap-5 mt-6">
          {detail ? (
            detail?.map((item: any, index: number) => (
              <div key={index} className="p-3 shadow">
                <div className="w-14 h-14 rounded-full bg-gray-300 mx-auto" />
                <div className="mt-4 font-semibold">{item.name}</div>

                <Badge>{item.position}</Badge>

                <div className="mt-5 flex justify-center gap-1">
                  <Link
                    href={item.instagram}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    href={item.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm">Member still not yet.</div>
          )}
        </div>
      </div>
    </CFieldInput>
  );
};

export default CTeamForm;
