import {Module} from "@nestjs/common";
import {FeedGateway} from "./feed.gateway";
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./schemas/post.schema";
import {FeedService} from "./schemas/feed.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
    providers: [FeedGateway, FeedService]
})
export class FeedModule {}