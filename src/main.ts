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

  // Security middleware
  app.use(helmet());
  app.use(compression());

  // CORS configuration
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', 'https://nxoland.com'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
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

  const port = configService.get('PORT', 3000);
  await app.listen(port);
  
  console.log(`🚀 NXOLand API is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/${configService.get('SWAGGER_PATH', 'api/docs')}`);
}

bootstrap();
