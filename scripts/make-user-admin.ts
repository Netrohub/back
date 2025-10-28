#!/usr/bin/env ts-node
/**
 * Script to make a user an admin
 * Usage: npx ts-node scripts/make-user-admin.ts user@example.com
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeUserAdmin(identifier: string) {
  try {
    console.log('🔍 Searching for user...\n');

    // Try to find user by email or username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      },
      include: {
        user_roles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user) {
      console.error(`❌ User not found: ${identifier}`);
      console.log('\n💡 Make sure the email or username is correct');
      process.exit(1);
    }

    console.log(`✅ Found user:`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Username: ${user.username}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Current roles: ${user.user_roles.map(ur => ur.role.slug).join(', ') || 'none'}\n`);

    // Find admin role
    const adminRole = await prisma.role.findUnique({
      where: { slug: 'admin' }
    });

    if (!adminRole) {
      console.error('❌ Admin role not found in database');
      console.log('\n💡 Creating admin role...\n');
      
      // Create admin role
      const newAdminRole = await prisma.role.create({
        data: {
          name: 'Admin',
          slug: 'admin',
          description: 'Full system access',
          is_active: true
        }
      });
      
      console.log(`✅ Created admin role (ID: ${newAdminRole.id})\n`);
    }

    // Check if user already has admin role
    const hasAdminRole = user.user_roles.some(ur => ur.role.slug === 'admin');

    if (hasAdminRole) {
      console.log(`✅ User already has admin role!`);
      console.log(`\n📊 User details:`);
      console.log(`   Username: ${user.username}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Roles: ${user.user_roles.map(ur => ur.role.name).join(', ')}`);
      return;
    }

    // Add admin role to user
    console.log('🔄 Granting admin role...\n');
    
    const userRole = await prisma.userRole.create({
      data: {
        user_id: user.id,
        role_id: adminRole!.id,
        granted_at: new Date()
      },
      include: {
        role: true
      }
    });

    console.log(`✅ Successfully granted admin role!`);
    console.log(`\n📊 User details:`);
    console.log(`   Username: ${user.username}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Roles: ${[...user.user_roles.map(ur => ur.role.name), userRole.role.name].join(', ')}`);
    console.log(`   Admin granted at: ${userRole.granted_at.toISOString()}`);
    
    console.log(`\n🎉 User ${user.username} is now an admin!`);

  } catch (error) {
    console.error('\n❌ Error making user admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Main execution
const identifier = process.argv[2];

if (!identifier) {
  console.error('❌ Please provide user email or username as argument\n');
  console.log('Usage:');
  console.log('  npx ts-node scripts/make-user-admin.ts user@example.com');
  console.log('  npx ts-node scripts/make-user-admin.ts johndoe');
  console.log('\nOr add to package.json scripts and use:');
  console.log('  npm run make-admin user@example.com');
  process.exit(1);
}

console.log('🚀 NXOLand - Make User Admin\n');
console.log('='.repeat(50));
console.log('');

makeUserAdmin(identifier);
