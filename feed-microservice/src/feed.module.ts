import { Module } from '@nestjs/common';
import { FeedService } from './feed.service'
import { MongooseModule } from "@nestjs/mongoose";
import { FeedGateway } from "./feed.gateway";
import { postSchema } from "./schemas/post.schema";

@Module({
  imports: [
      MongooseModule.forRoot(
          'mongodb+srv://henrik:newsfeed@newsfeed.7zds0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
      ),
      MongooseModule.forFeature([{ name: 'Post', schema: postSchema }])
  ],
  providers: [
      FeedGateway,
      FeedService
  ],
})
export class FeedModule {}
