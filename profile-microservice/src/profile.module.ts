import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileGateway } from './profile.gateway';
import { ProfileService } from './profile.service';
import { profileSchema } from "./schemas/profile.schema";

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://henrik:newsfeed@newsfeed.7zds0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        ),
        MongooseModule.forFeature([{ name: 'Profile', schema: profileSchema }])
    ],
    providers: [
        ProfileGateway,
        ProfileService
    ],
})
export class ProfileModule {
}
