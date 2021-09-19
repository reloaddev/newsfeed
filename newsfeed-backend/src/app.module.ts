import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { FeedModule } from "./feed/feed.module";

@Module({
  imports: [
      MongooseModule.forRoot(
          'mongodb+srv://henrik:newsfeed@newsfeed.7zds0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
      ),
      FeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
