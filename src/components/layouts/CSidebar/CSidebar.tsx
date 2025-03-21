'use client';

import { Button } from '@/components/ui/button';
import { useRouterNavigation } from '@/hooks/useRouterNavigation';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  AiOutlineBook,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import { BsBuildings, BsGear } from 'react-icons/bs';

type CSidebarProps = {};

const CSidebar: React.FC<CSidebarProps> = () => {
  const { navigate } = useRouterNavigation();
  const pathName = usePathname();

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>

          <div className="space-y-3">
            <Button
              variant={'ghost'}
              className={cn(
                'w-full justify-start rounded-none hover:text-indigo-500',
                { 'text-indigo-500  bg-indigo-100': pathName === '/' }
              )}
              onClick={() => navigate('/')}
            >
              <AiOutlineHome className="mr-2 text-lg" />
              Home
            </Button>

            {/* <Button
              variant={'ghost'}
              className={cn(
                'w-full justify-start rounded-none hover:text-indigo-500',
                { 'text-indigo-500  bg-indigo-100': pathName === '/messages' }
              )}
              onClick={() => navigate('/messages')}
            >
              <AiOutlineMessage className="mr-2 text-lg" />
              Messages
            </Button> */}

            <Button
              variant={'ghost'}
              className={cn(
                'w-full justify-start rounded-none hover:text-indigo-500',
                {
                  'text-indigo-500  bg-indigo-100':
                    pathName === '/company-profile',
                }
              )}
              onClick={() => navigate('/company-profile')}
            >
              <BsBuildings className="mr-2 text-lg" />
              Company Profile
            </Button>

            <Button
              variant={'ghost'}
              className={cn(
                'w-full justify-start rounded-none hover:text-indigo-500',
                {
                  'text-indigo-500  bg-indigo-100':
                    pathName === '/all-aplicants',
                }
              )}
              onClick={() => navigate('/all-aplicants')}
            >
              <AiOutlineUsergroupAdd className="mr-2 text-lg" />
              All Aplicants
            </Button>

            <Button
              variant={'ghost'}
              className={cn(
                'w-full justify-start rounded-none hover:text-indigo-500',
                {
                  'text-indigo-500  bg-indigo-100':
                    pathName === '/job-listings',
                }
              )}
              onClick={() => navigate('/job-listings')}
            >
              <AiOutlineBook className="mr-2 text-lg" />
              Job Listing
            </Button>
          </div>
        </div>

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>

            <Button
              variant={'ghost'}
              className={cn(
                'w-full justify-start rounded-none hover:text-indigo-500',
                { 'text-indigo-500  bg-indigo-100': pathName === '/settings' }
              )}
              onClick={() => navigate('/settings')}
            >
              <BsGear className="mr-2 text-lg" />
              Settings
            </Button>

            <Button
              variant={'ghost'}
              className="w-full justify-start rounded-none hover:text-primary text-red-500 hover:bg-red-300 hover:text-red-500"
              onClick={() => signOut()}
            >
              <AiOutlineLogout className="mr-2 text-lg" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSidebar;
