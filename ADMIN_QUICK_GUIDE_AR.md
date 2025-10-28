# ⚡ دليل سريع: جعل مستخدم أدمن

## 🎯 الطريقة الأسرع (SQL)

### 1️⃣ افتح قاعدة البيانات
- phpMyAdmin أو PostgreSQL Client

### 2️⃣ نفذ هذا الأمر (غيّر الإيميل):
```sql
INSERT INTO user_roles (user_id, role_id, granted_at)
SELECT u.id, r.id, NOW()
FROM users u, roles r
WHERE u.email = 'test@test.com' AND r.slug = 'admin'
ON CONFLICT DO NOTHING;
```

### 3️⃣ تحقق من النجاح:
```sql
SELECT u.username, STRING_AGG(r.slug, ', ') as roles
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.email = 'test@test.com'
GROUP BY u.username;
```

✅ **النتيجة:** يجب أن ترى `admin` في عمود roles

---

## 🚀 الطريقة الثانية (TypeScript Script)

### على VPS:
```bash
cd /home/ploi/api.nxoland.com
npm run make-admin test@test.com
```

### محلياً:
```bash
cd nxoland-backend
npm run make-admin test@test.com
```

---

## 📋 الطرق المتاحة

| الطريقة | الملف | الاستخدام |
|---------|-------|-----------|
| SQL | `make-user-admin.sql` | نسخ ولصق في phpMyAdmin |
| Script | `scripts/make-user-admin.ts` | `npm run make-admin EMAIL` |
| يدوي | `كيف_تجعل_مستخدم_ادمن.md` | دليل شامل بالعربية |
| English | `HOW_TO_MAKE_ADMIN.md` | Complete English guide |

---

## 🔍 أمثلة

### بالإيميل:
```sql
INSERT INTO user_roles (user_id, role_id, granted_at)
SELECT u.id, r.id, NOW() FROM users u, roles r
WHERE u.email = 'user@example.com' AND r.slug = 'admin'
ON CONFLICT DO NOTHING;
```

### باليوزرنيم:
```sql
INSERT INTO user_roles (user_id, role_id, granted_at)
SELECT u.id, r.id, NOW() FROM users u, roles r
WHERE u.username = 'johndoe' AND r.slug = 'admin'
ON CONFLICT DO NOTHING;
```

### بالـ ID:
```sql
INSERT INTO user_roles (user_id, role_id, granted_at)
VALUES (5, (SELECT id FROM roles WHERE slug = 'admin'), NOW())
ON CONFLICT DO NOTHING;
```

---

## ✅ التحقق

### اعرض أدوار مستخدم:
```sql
SELECT 
    u.username,
    u.email,
    STRING_AGG(r.slug, ', ') as roles
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.email = 'test@test.com'
GROUP BY u.username, u.email;
```

### اعرض جميع الأدمنز:
```sql
SELECT u.username, u.email
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE r.slug = 'admin';
```

---

## ❌ إزالة الأدمن

```sql
DELETE FROM user_roles
WHERE user_id = (SELECT id FROM users WHERE email = 'test@test.com')
AND role_id = (SELECT id FROM roles WHERE slug = 'admin');
```

---

## 📚 للمزيد من التفاصيل

- **`كيف_تجعل_مستخدم_ادمن.md`** - دليل شامل بالعربية
- **`HOW_TO_MAKE_ADMIN.md`** - Complete English documentation
- **`make-user-admin.sql`** - Ready-to-use SQL script
- **`scripts/make-user-admin.ts`** - TypeScript automation script

---

## 🎉 خلاص!

**أسرع طريقة:**
1. افتح phpMyAdmin
2. غيّر الإيميل في الأمر أعلاه
3. نفذ الأمر
4. ✅ تم!

**المستخدم الآن عنده صلاحيات أدمن كاملة! 🚀**
