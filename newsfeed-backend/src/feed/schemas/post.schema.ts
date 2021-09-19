import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true }
});

export interface Post {
    id: string;
    userId: string;
    text: string;
    date: string;
}