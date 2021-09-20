import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "./schemas/post.schema";

@Injectable()
export class FeedService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

    async create(post: Post): Promise<Post> {
        const createdPost = new this.postModel({
            userId: post.userId,
            text: post.text,
            comments: post.comments,
            date: post.date
        });
        return createdPost.save();
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

}
