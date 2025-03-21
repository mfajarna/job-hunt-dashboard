import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { dateFormat, parseCompany } from '@/lib/utils';
import {
  FacebookIcon,
  InstagramIcon,
  Linkedin,
  LinkedinIcon,
  TwitterIcon,
} from 'lucide-react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineFire } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import {
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
} from 'react-icons/hi';
import prisma from '../../../../lib/prisma';

type CompanyProfilePageProps = {};

export const metadata: Metadata = {
  title: 'Dashboard | Company Profile',
};

async function getDetailCompany() {
  const serverSession = await getServerSession(authOptions);

  const data = await prisma.company.findFirst({
    where: {
      id: serverSession?.user.id,
    },
    include: {
      CompanyOverview: true,
      CompanySocialMedia: true,
      CompanyTeam: true,
      Job: {
        include: {
          CategoryJob: true,
        },
      },
      _count: {
        select: {
          Job: true,
        },
      },
    },
  });

  return parseCompany(data);
}

const CompanyProfilePage: React.FC<CompanyProfilePageProps> = async ({}) => {
  const data = await getDetailCompany();

  return (
    <>
      <div className="bg-slate-100 px-32 pt-16 pb-14">
        <div className="inline-flex gap-6 items-start">
          <Image
            src={
              data.detail ? data.detail.image.publicUrl : '/images/company2.png'
            }
            alt="image"
            width={100}
            height={100}
          />

          <div>
            <div className="inline-flex gap-4 items-center">
              <span className="text-4xl font-semibold">
                {data.detail.companyName ?? ''}
              </span>
              <Badge>{data.totalJobs} Jobs</Badge>
            </div>

            <div>
              <div className="mt-2">
                <Link href="/" className="font-semibold text-primary">
                  {data.detail.website}
                </Link>
              </div>

              <div className="inline-flex items-center gap-10 mt-6">
                <div className="inline-flex items-center gap-3">
                  <div>
                    <div className="bg-white p-3 rounded-full">
                      <AiOutlineFire className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Founded</div>
                    <div className="font-semibold">
                      {dateFormat(data.detail.dateFounded, 'MMMM, DD YYYY')}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-3">
                  <div>
                    <div className="bg-white p-3 rounded-full">
                      <BsPeople className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Employees</div>
                    <div className="font-semibold">
                      {/* {data.Companyoverview[0].employee} */}
                      {data.detail.employee}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-3">
                  <div>
                    <div className="bg-white p-3 rounded-full">
                      <HiOutlineLocationMarker className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Location</div>
                    <div className="font-semibold">
                      {/* {data.Companyoverview[0].location} */}
                      {data.detail.location}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-3">
                  <div>
                    <div className="bg-white p-3 rounded-full">
                      <HiOutlineOfficeBuilding className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Industry</div>
                    <div className="font-semibold">
                      {/* {data.Companyoverview[0].industry} */}
                      {data.detail.industry}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-32 py-16 flex flex-row items-start gap-10">
        <div className="w-3/4">
          <div className="mb-16">
            <div className="text-3xl font-semibold mb-3">Company Profile</div>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: data.detail.description ?? '<p>N/a</p>',
              }}
            ></div>
          </div>

          <div>
            <div className="text-3xl font-semibold mb-4">Contact</div>
            <div className="flex items-center gap-5 w-[400px] flex-wrap">
              <div className="p-2 border border-primary text-primary w-max inline-flex items-center gap-3 font-semibold">
                <FacebookIcon />
                <Link
                  href={data.socialMedia ? data.socialMedia.facebook : 'n/a'}
                >
                  <span className="text-sm">Facebook</span>
                </Link>
              </div>
              <div className="p-2 border border-primary text-primary w-max inline-flex items-center gap-3 font-semibold">
                <TwitterIcon />
                <Link
                  href={data.socialMedia ? data.socialMedia.twitter : 'n/a'}
                >
                  <span className="text-sm">Twitter</span>
                </Link>
              </div>
              <div className="p-2 border border-primary text-primary w-max inline-flex items-center gap-3 font-semibold">
                <LinkedinIcon />
                <Link
                  href={data.socialMedia ? data.socialMedia.twitter : 'n/a'}
                >
                  <span className="text-sm">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/4">
          <div className="text-3xl font-semibold mb-4">Tech Stack</div>
          <div className="text-gray-500 text-sm">
            Learn about the technology and tools that Pattern uses.
          </div>
          <div className="mt-5 flex flex-row items-center flex-wrap gap-4">
            {data.detail.techStack
              ? data.detail.techStack.map((item: any, i: number) => (
                  <Badge key={item + i}>{item}</Badge>
                ))
              : 'n/a'}
          </div>
        </div>
      </div>

      <div className="px-32">
        <Separator />
        <div className="my-16">
          <div className="text-3xl font-semibold mb-4">Teams</div>
          <div className="grid grid-cols-5 gap-5 mt-5">
            {data.teams &&
              data.teams.map((item: any, index: number) => (
                <div className="border border-border px-3 py-5" key={index}>
                  <div className="w-16 h-16 rounded-full mx-auto bg-gray-300" />

                  <div className="text-center my-4">
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-gray-500 text-xs">{item.position}</div>
                  </div>

                  <div className="mx-auto w-max">
                    <div className="inline-flex gap-2">
                      <Link href={item.instagram}>
                        <InstagramIcon className="w-4 h-4 text-gray-500" />
                      </Link>
                      <Link href={item.linkedin}>
                        <Linkedin className="w-4 h-4 text-gray-500" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <Separator />
      </div>
    </>
  );
};

export default CompanyProfilePage;
