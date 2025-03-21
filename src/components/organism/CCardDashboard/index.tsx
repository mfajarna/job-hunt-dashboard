'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type CCardDashboardProps = {
  total: string;
  title: string;
  path: string;
};

const CCardDashboard: React.FC<CCardDashboardProps> = ({
  total,
  title,
  path,
}) => {
  const nav = useRouter();

  return (
    <div
      className="p-3 w-full rounded-lg bg-gradient-to-r from-[#0F3324]/25 to-[#0F3324]/0 items-center cursor-pointer"
      onClick={() => nav.push(path)}
    >
      <div
        className={`px-4 h-[130px] rounded-lg bg-gradient-to-r from-[#0F3324] to-[#0F3324]/0 `}
      >
        <div className="inline-flex gap-4 items-center justify-between px-2 text-white py-5 ">
          <div className="text-5xl font-semibold">{total}</div>
          <div className="text-lg">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default CCardDashboard;
