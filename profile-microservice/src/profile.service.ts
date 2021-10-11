import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { Profile, ProfileDocument } from "./schemas/profile.schema";
import { InjectModel } from "@nestjs/mongoose";
import { ProfileMetric } from "./schemas/profile-metric.model";

@Injectable()
export class ProfileService {

    constructor(@InjectModel('Profile') private readonly profileModel: Model<ProfileDocument>) {}

    async getProfile(userId: string): Promise<Profile> {
        return await this.findProfile(userId)
    }

    async getAllProfiles(): Promise<Profile[]> {
        return await this.profileModel.find({});
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
        updateProfile.name = profile.name;
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

    async updateProfileMetrics(userId: string, metric: ProfileMetric, count: number) {
        const updateProfile = await this.findProfile(userId);
        switch (metric) {
            case ProfileMetric.POST_COUNT: {
                updateProfile.postCount = count;
                break;
            }
            case ProfileMetric.COMMENT_COUNT: {
                updateProfile.commentCount = count;
                break;
            }
        }
        await updateProfile.save();
        return updateProfile;
    }

    private async findProfile(userId: string): Promise<ProfileDocument> | undefined {
        let profile: ProfileDocument;
        try {
            profile = await this.profileModel.findOne({ userId: userId });
        } catch (error) {
            throw new NotFoundException('Could not find profile');
        }
        if (!profile) {
            return undefined;
        }
        return profile;
    }
}
