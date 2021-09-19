import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "./schemas/post.schema";

@Injectable()
export class FeedService {

    constructor(@InjectModel('Post') private postModel: Model<Post>) {}

    async create(post: Post): Promise<Post> {
        const createdPost = new this.postModel(post);
        return createdPost.save();
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

}
