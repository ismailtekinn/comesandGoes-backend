import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      id: 1,
      name: "Ruhi",
      surname: "Rahimi",
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
      phone: '1234567890',
    },
    {
      id: 2,
      name:"Kerromorfizim",
      surname:"Rahimi",
      username: 'user2',
      email: 'user2@example.com',
      password: 'password2',
      phone: '9876543210',
    },
  ];

  const clients = [
    {
      id: 1,
      clientName: 'Client1',
      clientSurname: 'Client1Surname',
      clientEmail: 'client1@example.com',
      clientPhone: '1111111111',
    },
  ];

  const userCash = [
    {
      id: 1,
      totalCash: 1000,
      cashCurrency: 'USD',
      userId: 1,
    },
    {
      id: 2,
      totalCash: 2000,
      cashCurrency: 'EUR',
      userId: 2,
    },
  ];

  const debts = [
    {
      id: 1,
      debtAmount: 500,
      debtCurrency: 'USD',
      debtorId: 1,
      creditorId: 2,
      debtIssuanceDate: new Date('2023-01-01'),
      debtRepaymentDate: new Date('2023-02-01'),
    },
  ];

  const moneyTransfers = [
    {
      id: 1,
      receivedAmount: 300,
      moneyCurrency: 'USD',
      senderId: 2,
      receiverId: 1,
      transferDate: new Date('2023-03-01'),
    },
  ];

  const accounts = [
    {
      id: 1,
      totalAmount: 5000,
      totalCurrency: 'USD',
      clientId: 1,
      userId: 1,
    },
    {
      id: 2,
      totalAmount: 8000,
      totalCurrency: 'EUR',
      clientId: 1,
      userId: 2,
    },
  ];

  const multilanguage = [
    {
      id: 1,
      MlCode: 'EN_US_WELCOME',
      CountryCode: 'US',
      MlValue: 'Welcome',
      ApplicationCode: 'APP1',
    },
    {
      id: 2,
      MlCode: 'ES_ES_WELCOME',
      CountryCode: 'ES',
      MlValue: 'Bienvenido',
      ApplicationCode: 'APP1',
    },
  ];

  // Seed Users
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }

  // Seed Clients
  for (const client of clients) {
    await prisma.client.upsert({
      where: { id: client.id },
      update: client,
      create: client,
    });
  }

  // Seed UserCash
  for (const cash of userCash) {
    await prisma.userCash.upsert({
      where: { id: cash.id },
      update: cash,
      create: cash,
    });
  }

  // Seed Debts
  for (const debt of debts) {
    await prisma.debt.upsert({
      where: { id: debt.id },
      update: debt,
      create: debt,
    });
  }

  // Seed MoneyTransfers
  for (const transfer of moneyTransfers) {
    await prisma.moneyTransfer.upsert({
      where: { id: transfer.id },
      update: transfer,
      create: transfer,
    });
  }

  // Seed Accounts
  for (const account of accounts) {
    await prisma.account.upsert({
      where: { id: account.id },
      update: account,
      create: account,
    });
  }

  // Seed Multilanguage
  for (const ml of multilanguage) {
    await prisma.multilanguage.upsert({
      where: { id: ml.id },
      update: ml,
      create: ml,
    });
  }

  console.log('Seed data has been imported.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
