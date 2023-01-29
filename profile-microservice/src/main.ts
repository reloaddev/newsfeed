import { NestFactory } from '@nestjs/core';
import { ProfileModule } from './profile.module';
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(ProfileModule);
  app.enableCors();
  await app.listen(3001);
  Logger.log(`Profile microservice is running on: ${await app.getUrl()}`);
}
bootstrap();
