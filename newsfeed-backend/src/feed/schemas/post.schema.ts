import * as mongoose from 'mongoose';

export interface Comment {
    id: string;
    userId: string;
    text: string;
    date: Date;
}

export interface Post {
    id: string;
    userId: string;
    text: string;
    comments: Comment[];
    date: Date;
}

const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true }
});

export const postSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    comments: { type: [commentSchema], required: true },
    date: { type: Date, required: true }
});

export type PostDocument = Post & mongoose.Document;
