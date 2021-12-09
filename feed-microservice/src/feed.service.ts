import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Comment, Post, PostDocument} from "./schemas/post.schema";

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
        const updatedPost = await this.getPost(post.id);
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

    async deletePost(postId: string): Promise<boolean> {
        try {
            await this.postModel.findByIdAndDelete(postId);
        } catch (error) {
            console.error(error);
            throw new Error(postId);
        }
        return true;
    }

    async getPosts(): Promise<Post[]> {
        const posts: PostDocument[] = await this.postModel.find().exec();
        return posts.map(post => ({
            id: post.id,
            userId: post.userId,
            text: post.text,
            comments: post.comments,
            date: post.date
        }));
    }

    async getPostsByUserId(userId: string): Promise<PostDocument[]> {
        let posts: PostDocument[] = [];
        try {
            posts = await this.postModel.find({userId: userId});
        } catch (error) {
            throw new NotFoundException(`Could not find any posts for user '${userId}'`);
        }
        return posts;
    }

    async getCommentsByUserId(userId: string): Promise<Comment[]> {
        const posts = await this.getPosts();
        let comments: Comment[] = [];
        posts.forEach(post => {
            comments.push(...post.comments.filter(comment => comment.userId === userId));
        });
        return comments;
    }

    async deleteCommentsByUserId(userId: string): Promise<Post[]> {
        const posts = await this.getPosts();
        const userComments = await this.getCommentsByUserId(userId);
        const updatedPosts = [];
        for (const post of posts) {
            userComments.forEach(userComment => {
                post.comments = post.comments.filter(postComment => postComment === userComment)
            });
            updatedPosts.push(await this.updatePost(post));
        }
        return updatedPosts;
    }

    async getPost(id: string): Promise<PostDocument> {
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
