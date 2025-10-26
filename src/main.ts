import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS configuration (before helmet to avoid conflicts)
  app.enableCors({
    origin: [
      'https://nxoland.com',
      'https://www.nxoland.com',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      configService.get('CORS_ORIGIN', 'https://www.nxoland.com')
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept',
      'Origin',
      'X-Requested-With',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers'
    ],
    exposedHeaders: ['Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  // Security middleware (configured to work with CORS)
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
  }));
  app.use(compression());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`🔍 ${req.method} ${req.url}`);
    next();
  });

  // Manual CORS middleware for additional support
  app.use((req, res, next) => {
    const allowedOrigins = [
      'https://nxoland.com',
      'https://www.nxoland.com',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      configService.get('CORS_ORIGIN', 'https://www.nxoland.com')
    ];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    
    // Debug logging for authorization header
    if (req.url?.includes('/kyc/verify-email')) {
      console.log('🔍 Incoming request headers:', {
        method: req.method,
        url: req.url,
        auth: req.headers.authorization ? `${req.headers.authorization.substring(0, 30)}...` : 'none',
        authorizationRaw: req.headers.authorization,
        allHeaders: Object.keys(req.headers),
        rawHeaders: req.rawHeaders
      });
    }
    
    next();
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE', 'NXOLand API'))
    .setDescription(configService.get('SWAGGER_DESCRIPTION', 'Complete Digital Marketplace Platform API'))
    .setVersion(configService.get('SWAGGER_VERSION', '1.0.0'))
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('products', 'Product management')
    .addTag('cart', 'Shopping cart')
    .addTag('orders', 'Order management')
    .addTag('wishlist', 'Wishlist management')
    .addTag('disputes', 'Dispute resolution')
    .addTag('seller', 'Seller dashboard')
    .addTag('admin', 'Admin panel')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    configService.get('SWAGGER_PATH', 'api/docs'),
    app,
    document,
  );

  // Log all registered routes
  const routes = app.getHttpServer()._events.request;
  const registeredRoutes = [];
  app.getHttpAdapter().getInstance()._router?.stack?.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods).join(',').toUpperCase();
      registeredRoutes.push(`${methods} ${middleware.route.path}`);
    }
  });
  
  console.log('📋 Registered Routes:');
  registeredRoutes.forEach(route => console.log(`  ${route}`));

  const port = configService.get('PORT', 3000);
  await app.listen(port);
  
  console.log(`🚀 NXOLand API is running on: https://api.nxoland.com/api`);
  console.log(`📚 API Documentation: https://api.nxoland.com/api/${configService.get('SWAGGER_PATH', 'api/docs')}`);
}

bootstrap();
