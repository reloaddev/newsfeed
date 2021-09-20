import * as mongoose from 'mongoose';

export interface Comment {
    id: string;
    userId: string;
    text: string;
    date: string;
}

export interface Post extends mongoose.Document {
    id: string;
    userId: string;
    text: string;
    comments: Comment[];
    date: string;
}

const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true }
});

export const postSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    comments: { type: [commentSchema], required: true },
    date: { type: String, required: true }
});
