# Environment Variables Documentation

Complete reference for all environment variables required by the NXOLand backend.

## 🔐 Required Variables

These variables **must** be set for the application to run:

### Database
```env
DATABASE_URL="postgresql://username:password@host:5432/dbname?schema=public"
```
- **Description:** PostgreSQL connection string
- **Format:** `postgresql://[user]:[password]@[host]:[port]/[database]?schema=public`
- **Example:** `postgresql://nxoland:password@localhost:5432/nxoland?schema=public`
- **Production:** Use Render managed PostgreSQL connection string

### Authentication
```env
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
```
- **Description:** Secret key for JWT token signing
- **Requirements:** Minimum 32 characters, use a strong random string
- **Generate:** Use `openssl rand -base64 32` or similar

```env
JWT_EXPIRES_IN="7d"
```
- **Description:** JWT access token expiration time
- **Default:** `7d` (7 days)
- **Format:** Number + unit (s, m, h, d) - e.g., `1h`, `30d`, `90d`

```env
REFRESH_TOKEN_EXPIRES_IN="30d"
```
- **Description:** Refresh token expiration time
- **Default:** `30d` (30 days)

## 📧 Email Configuration

```env
SMTP_HOST="smtp.hostinger.com"
```
- **Description:** SMTP server hostname
- **Example:** `smtp.gmail.com`, `smtp.hostinger.com`, `smtp.sendgrid.net`

```env
SMTP_PORT="587"
```
- **Description:** SMTP server port
- **Options:** `587` (TLS), `465` (SSL), `25` (unencrypted)
- **Default:** `587`

```env
SMTP_USER="noreply@nxoland.com"
```
- **Description:** SMTP authentication username (email address)

```env
SMTP_PASS="your-smtp-password"
```
- **Description:** SMTP authentication password or app password

```env
SMTP_FROM="noreply@nxoland.com"
```
- **Description:** Email sender address
- **Default:** `noreply@nxoland.com`

## 🌐 Frontend/API URLs

```env
FRONTEND_URL="https://www.nxoland.com"
```
- **Description:** Frontend application URL (for password reset links, etc.)
- **Production:** `https://www.nxoland.com`
- **Development:** `http://localhost:5173`

```env
CORS_ORIGIN="https://www.nxoland.com"
```
- **Description:** Allowed CORS origins (comma-separated for multiple)
- **Production:** Should only include production domains
- **Development:** Includes localhost automatically

## 🔑 Third-Party APIs

### Persona (KYC Verification)
```env
PERSONA_API_KEY="your-persona-api-key"
```
- **Description:** Persona API key for identity verification
- **Get from:** [Persona Dashboard](https://app.withpersona.com/)

```env
PERSONA_WEBHOOK_SECRET="your-persona-webhook-secret"
```
- **Description:** Secret for verifying Persona webhook signatures

### Tap Payment
```env
TAP_PAYMENT_SECRET_KEY="sk_test_..."
```
- **Description:** Tap Payment secret key
- **Test:** Use `sk_test_...` for testing
- **Production:** Use `sk_live_...` for production

```env
TAP_PAYMENT_PUBLIC_KEY="pk_test_..."
```
- **Description:** Tap Payment public key (for frontend)
- **Test:** Use `pk_test_...` for testing
- **Production:** Use `pk_live_...` for production

## ⚙️ Application Settings

```env
NODE_ENV="production"
```
- **Description:** Application environment
- **Options:** `development`, `production`, `test`
- **Default:** `development`

```env
PORT="3000"
```
- **Description:** Port the server listens on
- **Default:** `3000`
- **Production:** Usually set by hosting platform (Render, Heroku, etc.)

```env
LOG_LEVEL="info"
```
- **Description:** Logging level
- **Options:** `error`, `warn`, `info`, `debug`, `trace`
- **Default:** `info` (production), `debug` (development)

## 📚 Swagger Documentation

```env
SWAGGER_TITLE="NXOLand API"
```
- **Description:** Swagger documentation title
- **Default:** `NXOLand API`

```env
SWAGGER_DESCRIPTION="Complete Digital Marketplace Platform API"
```
- **Description:** Swagger documentation description

```env
SWAGGER_VERSION="1.0.0"
```
- **Description:** API version for Swagger
- **Default:** `1.0.0`

```env
SWAGGER_PATH="api/docs"
```
- **Description:** Path where Swagger docs are served
- **Default:** `api/docs`
- **Access:** `https://api.nxoland.com/api/docs`

## 🗄️ Redis (Optional - for queues)

```env
REDIS_HOST="localhost"
```
- **Description:** Redis server hostname
- **Default:** `localhost`

```env
REDIS_PORT="6379"
```
- **Description:** Redis server port
- **Default:** `6379`

```env
REDIS_PASSWORD=""
```
- **Description:** Redis authentication password (if required)
- **Default:** Empty (no password)

## 🔒 Security

```env
ENCRYPTION_KEY="nxoland-admin-secure-key-2025"
```
- **Description:** Frontend token encryption key (if using encrypted storage)
- **Note:** Should match frontend `VITE_ENCRYPTION_KEY`

## 📝 Example `.env` File

### Development
```env
# Database
DATABASE_URL="postgresql://nxoland:password@localhost:5432/nxoland_dev?schema=public"

# Authentication
JWT_SECRET="dev-secret-key-min-32-characters-long-12345"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_EXPIRES_IN="30d"

# Email (Development - Use test SMTP or Mailtrap)
SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT="587"
SMTP_USER="your-mailtrap-user"
SMTP_PASS="your-mailtrap-pass"
SMTP_FROM="noreply@nxoland.local"

# Frontend
FRONTEND_URL="http://localhost:5173"
CORS_ORIGIN="http://localhost:5173"

# Environment
NODE_ENV="development"
PORT="3000"
LOG_LEVEL="debug"

# Third-Party (Test keys)
PERSONA_API_KEY="your-test-persona-key"
TAP_PAYMENT_SECRET_KEY="sk_test_..."
TAP_PAYMENT_PUBLIC_KEY="pk_test_..."
```

### Production
```env
# Database (Render PostgreSQL)
DATABASE_URL="postgresql://username:password@dpg-xxx.render.com:5432/nxoland"

# Authentication (Use strong random secret!)
JWT_SECRET="production-super-secret-key-min-32-chars-or-more-very-secure"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_EXPIRES_IN="30d"

# Email (Production SMTP)
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="587"
SMTP_USER="noreply@nxoland.com"
SMTP_PASS="your-production-smtp-password"
SMTP_FROM="noreply@nxoland.com"

# Frontend
FRONTEND_URL="https://www.nxoland.com"
CORS_ORIGIN="https://www.nxoland.com"

# Environment
NODE_ENV="production"
PORT="3000"
LOG_LEVEL="info"

# Third-Party (Production keys)
PERSONA_API_KEY="live_persona_api_key"
TAP_PAYMENT_SECRET_KEY="sk_live_..."
TAP_PAYMENT_PUBLIC_KEY="pk_live_..."
```

## 🔍 Variable Validation

The application will:
- ✅ Validate `JWT_SECRET` is set and warn if too short
- ✅ Check database connectivity on startup
- ✅ Verify SMTP configuration on startup (logs warning if invalid)
- ✅ Validate required Persona keys before making API calls

## 🚨 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different secrets** for development and production
3. **Rotate secrets regularly** (especially JWT_SECRET)
4. **Use environment-specific keys** for third-party services
5. **Restrict CORS_ORIGIN** to actual domains in production
6. **Use strong passwords** for database and SMTP
7. **Enable SSL/TLS** for all connections (SMTP, Database)

## 📋 Quick Checklist

Before deploying to production, ensure:
- [ ] All required variables are set
- [ ] `JWT_SECRET` is strong and unique
- [ ] Database URL points to production database
- [ ] SMTP credentials are correct and tested
- [ ] CORS_ORIGIN only includes production domains
- [ ] Third-party API keys are production keys (not test)
- [ ] `NODE_ENV=production`
- [ ] `LOG_LEVEL=info` or `warn` (not `debug`)

---

**Last Updated:** October 29, 2025

