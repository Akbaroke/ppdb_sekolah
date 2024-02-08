import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

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

  if (configService.get('node_env') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Portal')
      .setDescription('')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: configService.getOrThrow('frontend_url'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const port = await configService.get('port', 3000);
  await app.listen(port);
}
bootstrap();
