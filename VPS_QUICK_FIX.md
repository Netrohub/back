# 🚨 Quick Fix for Prisma Schema Error

## Problem
You're getting this error:
```
Error: This line is not a valid field or attribute definition.
@@check(rating >= 1 AND rating <= 5)
```

## Solution
Prisma doesn't support `@@check` constraints in its schema language. Remove this line:

```bash
# Edit the schema file
nano prisma/schema-v2.prisma

# Find line 235 and remove it:
# DELETE THIS LINE: @@check(rating >= 1 AND rating <= 5)
```

## Quick Fix Command
```bash
# Remove the problematic line
sed -i '/@@check(rating >= 1 AND rating <= 5)/d' prisma/schema-v2.prisma

# Now try generating again
npm run prisma:generate
```

## Note
- The check constraint is already created in your database via SQL
- Prisma just can't express it in its schema language
- Your data validation will still work at the database level

## After Fix
```bash
npm run prisma:generate
pm2 restart nxoland-backend
```

✅ **This should resolve the error immediately!**
