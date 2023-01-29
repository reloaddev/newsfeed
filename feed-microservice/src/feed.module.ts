import { Module } from '@nestjs/common';
import { FeedService } from './feed.service'
import { MongooseModule } from "@nestjs/mongoose";
import { FeedGateway } from "./feed.gateway";
import { postSchema } from "./schemas/post.schema";

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost/nest'),
      MongooseModule.forFeature([{ name: 'Post', schema: postSchema }])
  ],
  providers: [
      FeedGateway,
      FeedService
  ],
})
export class FeedModule {}
