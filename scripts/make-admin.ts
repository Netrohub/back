import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeUserAdmin(email: string) {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      return;
    }

    console.log(`👤 Found user: ${user.name} (${user.email})`);
    console.log(`📋 Current roles: ${JSON.stringify(user.roles)}`);

    // Update the user's roles to include admin
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        roles: ["user", "admin"], // Add admin role while keeping user role
      },
    });

    console.log(`✅ User updated successfully!`);
    console.log(`📋 New roles: ${JSON.stringify(updatedUser.roles)}`);
    console.log(`🔑 User ${email} now has admin privileges`);

  } catch (error) {
    console.error('❌ Error making user admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('❌ Please provide an email address');
  console.log('Usage: npx ts-node scripts/make-admin.ts user@example.com');
  process.exit(1);
}

makeUserAdmin(email);
