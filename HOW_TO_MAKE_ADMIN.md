# 🔑 How to Make a User Admin

## 📋 Overview

In v2.0 schema, roles are managed through a **many-to-many** relationship:
- `users` table
- `roles` table
- `user_roles` table (junction table)

---

## 🎯 Method 1: Direct SQL (Fastest)

### Step 1: Find the user ID
```sql
-- Find user by email
SELECT id, username, email FROM users WHERE email = 'user@example.com';

-- Find user by username
SELECT id, username, email FROM users WHERE username = 'johndoe';
```

### Step 2: Find the admin role ID
```sql
SELECT id, slug, name FROM roles WHERE slug = 'admin';
```

### Step 3: Add admin role to user
```sql
-- Replace USER_ID and ROLE_ID with actual values
INSERT INTO user_roles (user_id, role_id, granted_at)
VALUES (USER_ID, ROLE_ID, NOW())
ON CONFLICT (user_id, role_id) DO NOTHING;
```

### Complete Example:
```sql
-- Make user with ID 1 an admin
INSERT INTO user_roles (user_id, role_id, granted_at)
VALUES (
    1,  -- user_id
    (SELECT id FROM roles WHERE slug = 'admin'),  -- role_id
    NOW()
)
ON CONFLICT (user_id, role_id) DO NOTHING;
```

### Make user admin by email:
```sql
INSERT INTO user_roles (user_id, role_id, granted_at)
VALUES (
    (SELECT id FROM users WHERE email = 'user@example.com'),
    (SELECT id FROM roles WHERE slug = 'admin'),
    NOW()
)
ON CONFLICT (user_id, role_id) DO NOTHING;
```

---

## 🎯 Method 2: Using Prisma Script

### Create script: `scripts/make-admin.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeUserAdmin(userEmail: string) {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        user_roles: {
          include: { role: true }
        }
      }
    });

    if (!user) {
      console.error(`❌ User with email ${userEmail} not found`);
      return;
    }

    // Find admin role
    const adminRole = await prisma.role.findUnique({
      where: { slug: 'admin' }
    });

    if (!adminRole) {
      console.error('❌ Admin role not found in database');
      return;
    }

    // Check if user already has admin role
    const hasAdminRole = user.user_roles.some(ur => ur.role.slug === 'admin');
    
    if (hasAdminRole) {
      console.log(`✅ User ${user.email} already has admin role`);
      return;
    }

    // Add admin role to user
    await prisma.userRole.create({
      data: {
        user_id: user.id,
        role_id: adminRole.id,
        granted_at: new Date()
      }
    });

    console.log(`✅ Successfully granted admin role to ${user.email}`);
    console.log(`User: ${user.username} (${user.email})`);
    console.log(`Roles: ${user.user_roles.map(ur => ur.role.slug).join(', ')}, admin`);
    
  } catch (error) {
    console.error('❌ Error making user admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide user email as argument');
  console.log('Usage: npm run make-admin user@example.com');
  process.exit(1);
}

makeUserAdmin(email);
```

### Add to `package.json`:
```json
{
  "scripts": {
    "make-admin": "ts-node scripts/make-admin.ts"
  }
}
```

### Run:
```bash
npm run make-admin user@example.com
```

---

## 🎯 Method 3: Using API Endpoint (Recommended for Production)

### Create Admin Service Method

Add to `src/admin/admin.service.ts`:

```typescript
async grantAdminRole(userId: number, grantedBy: number) {
  // Find admin role
  const adminRole = await this.prisma.role.findUnique({
    where: { slug: 'admin' }
  });

  if (!adminRole) {
    throw new NotFoundException('Admin role not found');
  }

  // Check if user already has admin role
  const existingRole = await this.prisma.userRole.findUnique({
    where: {
      user_id_role_id: {
        user_id: userId,
        role_id: adminRole.id
      }
    }
  });

  if (existingRole) {
    throw new BadRequestException('User already has admin role');
  }

  // Grant admin role
  return this.prisma.userRole.create({
    data: {
      user_id: userId,
      role_id: adminRole.id,
      granted_by: grantedBy,
      granted_at: new Date()
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true
        }
      },
      role: true
    }
  });
}
```

---

## 🎯 Method 4: One-Line SQL Commands

### Make user admin by ID:
```sql
INSERT INTO user_roles (user_id, role_id, granted_at) 
VALUES (1, (SELECT id FROM roles WHERE slug = 'admin'), NOW()) 
ON CONFLICT DO NOTHING;
```

### Make user admin by email:
```sql
INSERT INTO user_roles (user_id, role_id, granted_at) 
SELECT u.id, r.id, NOW() 
FROM users u, roles r 
WHERE u.email = 'user@example.com' AND r.slug = 'admin'
ON CONFLICT DO NOTHING;
```

### Make user admin by username:
```sql
INSERT INTO user_roles (user_id, role_id, granted_at) 
SELECT u.id, r.id, NOW() 
FROM users u, roles r 
WHERE u.username = 'johndoe' AND r.slug = 'admin'
ON CONFLICT DO NOTHING;
```

---

## 🔍 Verification Queries

### Check user's roles:
```sql
SELECT 
    u.id,
    u.username,
    u.email,
    r.slug as role,
    r.name as role_name,
    ur.granted_at
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.email = 'user@example.com';
```

### Check all admins:
```sql
SELECT 
    u.id,
    u.username,
    u.email,
    u.created_at
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE r.slug = 'admin'
ORDER BY u.created_at DESC;
```

---

## 📚 Available Roles

Check what roles exist in your database:

```sql
SELECT id, slug, name, description FROM roles ORDER BY slug;
```

Common roles:
- `admin` - Full system access
- `user` - Regular user
- `seller` - Can list products
- `moderator` - Can moderate content (if exists)

---

## ⚠️ Important Notes

1. **Multiple Roles:**
   - A user can have multiple roles simultaneously
   - Example: user can be both `seller` and `admin`

2. **Remove Role:**
   ```sql
   DELETE FROM user_roles 
   WHERE user_id = USER_ID 
   AND role_id = (SELECT id FROM roles WHERE slug = 'admin');
   ```

3. **Check Before Adding:**
   - The `ON CONFLICT DO NOTHING` clause prevents duplicate roles
   - Safe to run multiple times

4. **Temporary Roles:**
   - You can set `expires_at` for temporary admin access:
   ```sql
   INSERT INTO user_roles (user_id, role_id, granted_at, expires_at)
   VALUES (
       USER_ID,
       (SELECT id FROM roles WHERE slug = 'admin'),
       NOW(),
       NOW() + INTERVAL '7 days'  -- Expires in 7 days
   );
   ```

---

## 🚀 Quick Start Guide

### For PostgreSQL (phpMyAdmin or psql):

1. **Find your user:**
   ```sql
   SELECT id, username, email FROM users WHERE email = 'YOUR_EMAIL';
   ```

2. **Make them admin:**
   ```sql
   INSERT INTO user_roles (user_id, role_id, granted_at)
   VALUES (
       YOUR_USER_ID,
       (SELECT id FROM roles WHERE slug = 'admin'),
       NOW()
   );
   ```

3. **Verify:**
   ```sql
   SELECT u.username, r.slug FROM users u
   JOIN user_roles ur ON u.id = ur.user_id
   JOIN roles r ON ur.role_id = r.id
   WHERE u.id = YOUR_USER_ID;
   ```

---

## 🎉 Expected Result

After making a user admin, they should have:
- ✅ Access to admin panel
- ✅ Access to admin APIs (`/api/admin/*`)
- ✅ Ability to manage users, products, orders, etc.
- ✅ Entry in `user_roles` table linking them to admin role

---

## 📝 Seed Admin User (For Fresh Install)

Add to `prisma/seed.ts`:

```typescript
async function seedAdmin() {
  // Create admin role if not exists
  const adminRole = await prisma.role.upsert({
    where: { slug: 'admin' },
    update: {},
    create: {
      name: 'Admin',
      slug: 'admin',
      description: 'Full system access',
      is_active: true
    }
  });

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@nxoland.com' },
    update: {},
    create: {
      username: 'admin',
      name: 'Admin User',
      email: 'admin@nxoland.com',
      password: await bcrypt.hash('admin123', 10),
      is_active: true,
      email_verified_at: new Date()
    }
  });

  // Grant admin role to user
  await prisma.userRole.upsert({
    where: {
      user_id_role_id: {
        user_id: adminUser.id,
        role_id: adminRole.id
      }
    },
    update: {},
    create: {
      user_id: adminUser.id,
      role_id: adminRole.id,
      granted_at: new Date()
    }
  });

  console.log('✅ Admin user created:', {
    email: 'admin@nxoland.com',
    password: 'admin123'
  });
}
```

Then run:
```bash
npx prisma db seed
```
