import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('Password123!', 12);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nxoland.com' },
    update: {},
    create: {
      username: 'admin',
      name: 'Admin User',
      email: 'admin@nxoland.com',
      password: hashedPassword,
      roles: JSON.stringify(['admin']),
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
  console.log('✅ Created admin user');

  // Create Seller Users
  const sellers = [
    {
      username: 'seller1',
      name: 'John Seller',
      email: 'seller1@nxoland.com',
      hashedPassword,
    },
    {
      username: 'seller2',
      name: 'Sarah Vendor',
      email: 'seller2@nxoland.com',
      hashedPassword,
    },
    {
      username: 'gameseller',
      name: 'Game Master',
      email: 'gameseller@nxoland.com',
      hashedPassword,
    },
  ];

  const createdSellers = [];
  for (const seller of sellers) {
    const s = await prisma.user.upsert({
      where: { email: seller.email },
      update: {},
      create: {
        username: seller.username,
        name: seller.name,
        email: seller.email,
        password: seller.hashedPassword,
        roles: JSON.stringify(['user', 'seller']),
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
    createdSellers.push(s);
    console.log(`✅ Created seller: ${seller.username}`);
  }

  // Create Regular Users
  const users = [
    {
      username: 'user1',
      name: 'Test User',
      email: 'user1@nxoland.com',
      hashedPassword,
    },
    {
      username: 'user2',
      name: 'Another User',
      email: 'user2@nxoland.com',
      hashedPassword,
    },
    {
      username: 'buyer123',
      name: 'Regular Buyer',
      email: 'buyer@nxoland.com',
      hashedPassword,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.hashedPassword,
        roles: JSON.stringify(['user']),
        is_active: true,
        kyc_verified: false,
        kyc_status: JSON.stringify({
          email: false,
          phone: false,
          identity: false,
        }),
      },
    });
    console.log(`✅ Created user: ${user.username}`);
  }

  // Create Categories
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
    {
      name: 'Gaming Products',
      slug: 'gaming-products',
      description: 'Gaming assets, in-game items, and accounts',
      status: 'active',
    },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const c = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    createdCategories.push(c);
    console.log(`✅ Created category: ${category.name}`);
  }

  // Create Sample Products
  const products = [
    {
      name: 'Premium Call of Duty Account - Max Level',
      description: 'Fully maxed out COD account with all weapons and camos. Battle-tested and verified.',
      price: 199.99,
      category: 'gaming-accounts',
      seller_id: createdSellers[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1607853554439-0069ec1ca922?w=800&q=80',
      ]),
      status: 'active',
    },
    {
      name: 'Instagram Account - 50K Followers',
      description: 'Authentic Instagram account with real followers and engagement. Niche: Gaming',
      price: 299.99,
      category: 'social-media',
      seller_id: createdSellers[1].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      ]),
      status: 'active',
    },
    {
      name: 'TikTok Creator Account - Verified',
      description: 'Verified TikTok creator account with 100K+ followers. High engagement rate.',
      price: 599.99,
      category: 'social-media',
      seller_id: createdSellers[1].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
      ]),
      status: 'active',
    },
    {
      name: 'YouTube Channel - 10K Subscribers',
      description: 'Gaming YouTube channel with 10K real subscribers. Monetization ready.',
      price: 799.99,
      category: 'digital-services',
      seller_id: createdSellers[2].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
      ]),
      status: 'active',
    },
    {
      name: 'CS:GO Prime Account - Global Elite',
      description: 'Prime CS:GO account with Global Elite rank and rare items in inventory.',
      price: 149.99,
      category: 'gaming-accounts',
      seller_id: createdSellers[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1607853554439-0069ec1ca922?w=800&q=80',
      ]),
      status: 'active',
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
    console.log(`✅ Created product: ${product.name}`);
  }

  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📧 Test Accounts:');
  console.log('  Admin: admin@nxoland.com / Password123!');
  console.log('  Seller: seller1@nxoland.com / Password123!');
  console.log('  User: user1@nxoland.com / Password123!');
  console.log('');
  console.log('✨ All users can access the application with these credentials!');
}

main()
  .catch((e) => {
    console.error('💥 Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
