import COverViewForm from '@/components/forms/OverviewForm/COverViewForm';
import CSocialLinksForm from '@/components/forms/SocialLinksForm/CSocialLinksForm';
import CTeamForm from '@/components/forms/TeamForm/CTeamForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authOptions } from '@/lib/auth-config';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';

async function getDetailCompany() {
  const session = await getServerSession(authOptions);

  const company = await prisma.company.findFirst({
    where: { id: (session?.user as any)?.id },
    include: {
      CompanyOverview: true,
      CompanySocialMedia: true,
      CompanyTeam: true,
      _count: {
        select: { CompanyTeam: true },
      },
    },
  });

  return company;
}

export default async function SettingsPage() {
  const company = await getDetailCompany();

  return (
    <div className="mb-5">
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <COverViewForm detail={company?.CompanyOverview[0]} />
        </TabsContent>
        <TabsContent value="socialLinks">
          <CSocialLinksForm detail={company?.CompanySocialMedia[0]} />
        </TabsContent>
        <TabsContent value="teams">
          <CTeamForm
            detail={company?.CompanyTeam}
            count={company?._count.CompanyTeam}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
