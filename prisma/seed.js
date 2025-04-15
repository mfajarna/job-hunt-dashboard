const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.industry.createMany({
    data: [
      {
        name: 'FMGC',
      },
      {
        name: 'AI',
      },
      {
        name: 'Steel',
      },
      {
        name: 'FnB',
      },
      {
        name: 'Financial',
      },
      {
        name: 'Education',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.categoryJob.createMany({
    data: [
      {
        name: 'Software Engineer',
      },
      {
        name: 'Backend Engineer',
      },
      {
        name: 'Software Engineer',
      },
      {
        name: 'Network Engineer',
      },
      {
        name: 'Intern Employee',
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
