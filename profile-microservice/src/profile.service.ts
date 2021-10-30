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
            userId: profileDraft.userId,
            description: profileDraft.description,
            picture: profileDraft.picture,
            postCount: profileDraft.postCount,
            commentCount: profileDraft.commentCount
        });
        await createdProfile.save();
        return {
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
            userId: updateProfile.userId,
            description: updateProfile.description,
            picture: updateProfile.picture,
            postCount: updateProfile.postCount,
            commentCount: updateProfile.commentCount
        }
    }

    async deleteProfile(userId: string) {
        try {
            await this.profileModel.findOneAndDelete({ userId: userId });
        } catch (error) {
            throw error;
        }
    }

    async updateProfileMetrics(userId: string, metric: ProfileMetric, count: number) {
        let updateProfile;
        try {
            updateProfile = await this.findProfile(userId);
        } catch (error) {
            console.error(error);
            return;
        }
        if (!updateProfile) {
            return;
        }
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
