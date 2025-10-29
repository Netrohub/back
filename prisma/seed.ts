import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('Password123!', 12);

  // Create Roles First (if they don't exist)
  const adminRole = await prisma.role.upsert({
    where: { slug: 'admin' },
    update: {},
    create: {
      name: 'Administrator',
      slug: 'admin',
      description: 'System administrator with full access',
      is_active: true,
      permissions: {
        all: true,
      },
    },
  });
  console.log('✅ Created/Verified admin role');

  const sellerRole = await prisma.role.upsert({
    where: { slug: 'seller' },
    update: {},
    create: {
      name: 'Seller',
      slug: 'seller',
      description: 'Seller can create and manage products',
      is_active: true,
      permissions: {
        create_product: true,
        manage_own_products: true,
        view_own_orders: true,
      },
    },
  });
  console.log('✅ Created/Verified seller role');

  const userRole = await prisma.role.upsert({
    where: { slug: 'user' },
    update: {},
    create: {
      name: 'User',
      slug: 'user',
      description: 'Regular user can browse and purchase',
      is_active: true,
      permissions: {
        browse: true,
        purchase: true,
        create_ticket: true,
      },
    },
  });
  console.log('✅ Created/Verified user role');

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nxoland.com' },
    update: {},
    create: {
      username: 'admin',
      name: 'Admin User',
      email: 'admin@nxoland.com',
      password: hashedPassword,
      is_active: true,
      email_verified_at: new Date(),
    },
  });

  // Assign admin role to admin user
  await prisma.userRole.upsert({
    where: {
      user_id_role_id: {
        user_id: admin.id,
        role_id: adminRole.id,
      },
    },
    update: {},
    create: {
      user_id: admin.id,
      role_id: adminRole.id,
      granted_at: new Date(),
    },
  });
  console.log('✅ Created admin user with admin role');

  // Create Seller Users
  const sellers = [
    {
      username: 'seller1',
      name: 'John Seller',
      email: 'seller1@nxoland.com',
    },
    {
      username: 'seller2',
      name: 'Sarah Vendor',
      email: 'seller2@nxoland.com',
    },
    {
      username: 'gameseller',
      name: 'Game Master',
      email: 'gameseller@nxoland.com',
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
        password: hashedPassword,
        is_active: true,
        email_verified_at: new Date(),
      },
    });

    // Assign seller and user roles
    await prisma.userRole.upsert({
      where: {
        user_id_role_id: {
          user_id: s.id,
          role_id: sellerRole.id,
        },
      },
      update: {},
      create: {
        user_id: s.id,
        role_id: sellerRole.id,
        granted_at: new Date(),
      },
    });

    await prisma.userRole.upsert({
      where: {
        user_id_role_id: {
          user_id: s.id,
          role_id: userRole.id,
        },
      },
      update: {},
      create: {
        user_id: s.id,
        role_id: userRole.id,
        granted_at: new Date(),
      },
    });

    createdSellers.push(s);
    console.log(`✅ Created seller: ${seller.username} with seller and user roles`);
  }

  // Create Regular Users
  const users = [
    {
      username: 'user1',
      name: 'Test User',
      email: 'user1@nxoland.com',
    },
    {
      username: 'user2',
      name: 'Another User',
      email: 'user2@nxoland.com',
    },
    {
      username: 'buyer123',
      name: 'Regular Buyer',
      email: 'buyer@nxoland.com',
    },
  ];

  for (const user of users) {
    const u = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        username: user.username,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        is_active: true,
      },
    });

    // Assign user role
    await prisma.userRole.upsert({
      where: {
        user_id_role_id: {
          user_id: u.id,
          role_id: userRole.id,
        },
      },
      update: {},
      create: {
        user_id: u.id,
        role_id: userRole.id,
        granted_at: new Date(),
      },
    });

    console.log(`✅ Created user: ${user.username} with user role`);
  }

  // Create Categories
  const categories = [
    {
      name: 'Gaming Accounts',
      slug: 'gaming-accounts',
      description: 'High-level gaming accounts and rare items',
      is_active: true,
    },
    {
      name: 'Social Media',
      slug: 'social-media',
      description: 'Premium social media accounts',
      is_active: true,
    },
    {
      name: 'Digital Services',
      slug: 'digital-services',
      description: 'Various digital services and tools',
      is_active: true,
    },
    {
      name: 'Gaming Products',
      slug: 'gaming-products',
      description: 'Gaming assets, in-game items, and accounts',
      is_active: true,
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

  // Helper function to generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Create Sample Products
  const products = [
    {
      name: 'Premium Call of Duty Account - Max Level',
      description: 'Fully maxed out COD account with all weapons and camos. Battle-tested and verified.',
      price: 199.99,
      category_id: createdCategories[0].id, // Gaming Accounts
      seller_id: createdSellers[0].id,
      platform: 'PlayStation',
      game: 'Call of Duty',
      account_level: 'Max Level',
      status: 'ACTIVE',
      stock_quantity: 1,
      delivery_time: 'instant',
    },
    {
      name: 'Instagram Account - 50K Followers',
      description: 'Authentic Instagram account with real followers and engagement. Niche: Gaming',
      price: 299.99,
      category_id: createdCategories[1].id, // Social Media
      seller_id: createdSellers[1].id,
      platform: 'Instagram',
      account_level: '50K Followers',
      status: 'ACTIVE',
      stock_quantity: 1,
      delivery_time: 'instant',
    },
    {
      name: 'TikTok Creator Account - Verified',
      description: 'Verified TikTok creator account with 100K+ followers. High engagement rate.',
      price: 599.99,
      category_id: createdCategories[1].id, // Social Media
      seller_id: createdSellers[1].id,
      platform: 'TikTok',
      account_level: '100K+ Followers',
      status: 'ACTIVE',
      stock_quantity: 1,
      delivery_time: 'instant',
    },
    {
      name: 'YouTube Channel - 10K Subscribers',
      description: 'Gaming YouTube channel with 10K real subscribers. Monetization ready.',
      price: 799.99,
      category_id: createdCategories[2].id, // Digital Services
      seller_id: createdSellers[2].id,
      platform: 'YouTube',
      account_level: '10K Subscribers',
      status: 'ACTIVE',
      stock_quantity: 1,
      delivery_time: 'instant',
    },
    {
      name: 'CS:GO Prime Account - Global Elite',
      description: 'Prime CS:GO account with Global Elite rank and rare items in inventory.',
      price: 149.99,
      category_id: createdCategories[0].id, // Gaming Accounts
      seller_id: createdSellers[0].id,
      platform: 'Steam',
      game: 'CS:GO',
      account_level: 'Global Elite',
      status: 'ACTIVE',
      stock_quantity: 1,
      delivery_time: 'instant',
    },
  ];

  for (const productData of products) {
    const slug = generateSlug(productData.name);
    
    // Check if product already exists
    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existing) {
      const product = await prisma.product.create({
        data: {
          ...productData,
          slug,
          price: productData.price,
          created_at: new Date(),
        },
      });

      // Create product image
      await prisma.productImage.create({
        data: {
          product_id: product.id,
          image_url: 'https://images.unsplash.com/photo-1607853554439-0069ec1ca922?w=800&q=80',
          alt_text: product.name,
          is_primary: true,
          sort_order: 0,
        },
      });

      console.log(`✅ Created product: ${product.name}`);
    } else {
      console.log(`⏭️  Product already exists: ${productData.name}`);
    }
  }

  console.log('');
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
