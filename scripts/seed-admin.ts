import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    console.log('🌱 Starting admin seeding...');

    // Check if super admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@nxoland.com' },
    });

    if (existingAdmin) {
      console.log('✅ Super admin already exists');
      return;
    }

    // Create super admin
    const hashedPassword = await bcrypt.hash('Admin123!', 12);
    
    const superAdmin = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'admin@nxoland.com',
        password: hashedPassword,
        roles: JSON.stringify(['super_admin']),
        is_active: true,
        kyc_verified: true,
        kyc_completed_at: new Date(),
        kyc_status: JSON.stringify({
          email: true,
          phone: true,
          identity: true,
        }),
      },
    });

    console.log('✅ Super admin created successfully');
    console.log('📧 Email: admin@nxoland.com');
    console.log('🔑 Password: Admin123!');
    console.log('⚠️  Please change the password after first login!');

    // Create some sample categories
    const categories = [
      {
        name: 'Gaming Accounts',
        slug: 'gaming-accounts',
        description: 'High-level gaming accounts and rare items',
        status: 'active',
      },
      {
        name: 'Social Media',
        slug: 'social-media',
        description: 'Premium social media accounts',
        status: 'active',
      },
      {
        name: 'Digital Services',
        slug: 'digital-services',
        description: 'Various digital services and tools',
        status: 'active',
      },
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: category,
        create: category,
      });
    }

    console.log('✅ Sample categories created');

    // Create system log entry
    await prisma.systemLog.create({
      data: {
        level: 'info',
        message: 'System initialized with super admin',
        context: {
          admin_id: superAdmin.id,
          action: 'system_init',
        },
      },
    });

    console.log('✅ System initialization logged');

  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding
seedAdmin()
  .then(() => {
    console.log('🎉 Admin seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Admin seeding failed:', error);
    process.exit(1);
  });
