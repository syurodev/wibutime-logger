import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

import { AppModule } from './app.module';
import { ExceptionResponseDetail } from './common/exception/exception.common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api'); // Thiết lập tiền tố toàn cầu là /api

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            Object.values(validationErrors[0].constraints)[0],
          ),
          HttpStatus.OK,
        );
      },
    }),
  );

  await app.listen(process.env.SERVICE_PORT, '0.0.0.0');

  console.log(`Logger service is run ${await app.getUrl()}`);

  console.log(`
      ========================ENV=======================

      SERVICE_PORT: ${process.env.SERVICE_PORT},
      CONFIG_KAFKA_HOST: ${process.env.CONFIG_KAFKA_HOST},
      CONFIG_KAFKA_PORT: ${process.env.CONFIG_KAFKA_PORT},
    `);
}
bootstrap();
