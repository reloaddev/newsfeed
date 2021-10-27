import { NestFactory } from '@nestjs/core';
import { FeedModule } from './feed.module';
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(FeedModule);
  app.enableCors();
  await app.listen(3000);
  Logger.log(`Feed microservice is running on: ${await app.getUrl()}`);
}
bootstrap();
