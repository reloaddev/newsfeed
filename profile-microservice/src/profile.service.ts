import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { Profile, ProfileDocument } from "./schemas/profile.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProfileService {

    constructor(@InjectModel('Profile') private readonly profileModel: Model<ProfileDocument>) {}

    async getProfile(userId: string): Promise<Profile> {
        const profile = await this.findProfile(userId);
        return profile
    }

    async createProfile(profileDraft: Profile): Promise<Profile> {
        const createdProfile = new this.profileModel({
            name: profileDraft.name,
            userId: profileDraft.userId,
            description: profileDraft.description,
            picture: profileDraft.picture,
            postCount: profileDraft.postCount,
            commentCount: profileDraft.commentCount
        });
        await createdProfile.save();
        return {
            name: createdProfile.name,
            userId: createdProfile.userId,
            description: createdProfile.description,
            picture: createdProfile.picture,
            postCount: createdProfile.postCount,
            commentCount: createdProfile.commentCount
        }
    }

    async updateProfile(profile: Profile): Promise<Profile> {
        const updateProfile = await this.findProfile(profile.userId);
        updateProfile.description = profile.description;
        updateProfile.picture = profile.picture;
        updateProfile.postCount = profile.postCount;
        updateProfile.commentCount = profile.commentCount;
        await updateProfile.save();
        return {
            name: updateProfile.name,
            userId: updateProfile.userId,
            description: updateProfile.description,
            picture: updateProfile.picture,
            postCount: updateProfile.postCount,
            commentCount: updateProfile.commentCount
        }
    }

    private async findProfile(userId: string): Promise<ProfileDocument> | undefined {
        let profile: ProfileDocument;
        try {
            profile = await this.profileModel.findOne({ userId: userId });
        } catch (error) {
            throw new NotFoundException('Could not find post');
        }
        if (!profile) {
            return undefined;
        }
        return profile;
    }
}
