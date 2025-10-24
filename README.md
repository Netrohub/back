# NXOLand Backend API

A robust NestJS API built with TypeScript, Prisma ORM, and MySQL for the NXOLand marketplace platform.

## 🚀 Technology Stack

- **NestJS 11** - Progressive Node.js framework
- **Node.js 20** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **Prisma ORM** - Modern database toolkit
- **MySQL** - Relational database
- **JWT** - JSON Web Token authentication
- **Swagger** - API documentation
- **Helmet** - Security middleware
- **Rate Limiting** - Request throttling

## 📁 Project Structure

```
nxoland-backend/
├── src/
│   ├── auth/             # Authentication module
│   ├── users/            # User management
│   ├── products/         # Product management
│   ├── cart/             # Shopping cart
│   ├── orders/           # Order processing
│   ├── disputes/         # Dispute resolution
│   ├── seller/           # Seller dashboard
│   ├── admin/            # Admin panel
│   ├── prisma/           # Database service
│   └── main.ts           # Application entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── ecosystem.config.js   # PM2 configuration
├── nginx.conf           # Nginx configuration
└── Dockerfile           # Docker configuration
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- MySQL 8.0+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run start:dev
```

### Environment Variables

Create `.env` file:
```env
DATABASE_URL="mysql://username:password@localhost:3306/nxoland"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
CORS_ORIGIN=https://nxoland.com
```

## 🗄️ Database Setup

### MySQL Configuration

1. **Create database:**
   ```sql
   CREATE DATABASE nxoland;
   CREATE USER 'nxoland'@'localhost' IDENTIFIED BY 'password123';
   GRANT ALL PRIVILEGES ON nxoland.* TO 'nxoland'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **Run migrations:**
   ```bash
   npx prisma migrate dev
   ```

3. **Seed database (optional):**
   ```bash
   npx prisma db seed
   ```

## 🚀 Deployment

### VPS Deployment with PM2

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

3. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

4. **Save PM2 configuration:**
   ```bash
   pm2 save
   pm2 startup
   ```

### Docker Deployment

```bash
# Build Docker image
docker build -t nxoland-backend .

# Run container
docker run -p 3000:3000 nxoland-backend
```

### Nginx Configuration

The included `nginx.conf` provides:
- SSL/HTTPS support
- Rate limiting
- Security headers
- Proxy to NestJS backend
- Health check endpoint

## 📚 API Documentation

Once running, access Swagger documentation at:
- **Development**: `https://api.nxoland.com/api/docs`
- **Production**: `https://api.nxoland.com/api/docs`

## 🔐 Authentication

The API uses JWT-based authentication:
- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **Profile**: `GET /api/auth/me`

## 🛡️ Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **JWT** - Secure token authentication
- **Input Validation** - Request validation
- **SQL Injection Protection** - Prisma ORM

## 📊 Database Schema

Key models:
- **User** - User accounts and profiles
- **Product** - Marketplace products
- **Order** - Order processing
- **Cart** - Shopping cart
- **Dispute** - Dispute resolution
- **Category** - Product categories

## 🔧 Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npx prisma studio` - Database GUI

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (seller)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details

## 📄 License

MIT License - see LICENSE file for details.
