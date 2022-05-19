import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  // if(process.env)
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.init();
}

bootstrap();