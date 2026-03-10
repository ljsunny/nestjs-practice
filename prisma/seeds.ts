import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: { password: hashed },
    create: {
      email: 'admin@test.com',
      password: hashed,
    },
  });

  console.log('Admin seeded');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());