import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Post, PostDocument} from "./post.schema";
import {CreatePostDto} from "../dto/create-post.dto";

@Injectable()
export class FeedService {

    constructor(@InjectModel('Post') private postModel: Model<PostDocument>) {}

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

}