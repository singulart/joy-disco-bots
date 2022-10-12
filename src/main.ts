import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import '@joystream/types';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.init();
}

bootstrap();