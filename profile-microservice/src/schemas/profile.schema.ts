import * as mongoose from 'mongoose';

export interface Profile {
    userId: string;
    description: string;
    picture: string;
    postCount: number;
    commentCount: number;
}

export const profileSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    description: { type: String, required: false },
    picture: { type: String, required: true },
    postCount: { type: String, required: true },
    commentCount: { type: String, required: true }
});

export type ProfileDocument = Profile & mongoose.Document;