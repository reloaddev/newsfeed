import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post, PostDocument } from "./schemas/post.schema";

@Injectable()
export class FeedService {

    constructor(@InjectModel('Post') private readonly postModel: Model<PostDocument>) {
    }

    async createPost(postDraft: Post): Promise<Post> {
        const createdPost = new this.postModel({
            userId: postDraft.userId,
            text: postDraft.text,
            comments: postDraft.comments,
            date: postDraft.date
        });
        await createdPost.save();
        return {
            id: createdPost.id,
            userId: createdPost.userId,
            text: createdPost.text,
            comments: createdPost.comments,
            date: createdPost.date
        }
    }

    async updatePost(post: Post): Promise<Post> {
        const updatedPost = await this.findPost(post.id);
        updatedPost.userId = post.userId;
        updatedPost.text = post.text;
        updatedPost.comments = post.comments;
        await updatedPost.save();
        return {
            id: updatedPost.id,
            userId: updatedPost.userId,
            text: updatedPost.text,
            comments: updatedPost.comments,
            date: updatedPost.date
        }
    }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().exec();
        return posts.map(post => ({
            id: post.id,
            userId: post.userId,
            text: post.text,
            comments: post.comments,
            date: post.date
        }));
    }

    private async findPost(id: string): Promise<PostDocument> {
        let post: PostDocument;
        try {
            post = await this.postModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find post');
        }
        if (!post) {
            throw new NotFoundException('Could not find post');
        }
        return post;
    }

}
