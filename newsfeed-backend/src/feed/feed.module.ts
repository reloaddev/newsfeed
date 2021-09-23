import { Module } from "@nestjs/common";
import { FeedGateway } from "./feed.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { postSchema } from "./schemas/post.schema";
import { FeedService } from "./feed.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Post', schema: postSchema }])
    ],
    providers: [FeedGateway, FeedService]
})
export class FeedModule {}
