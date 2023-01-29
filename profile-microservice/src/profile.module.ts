import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileGateway } from './profile.gateway';
import { ProfileService } from './profile.service';
import { profileSchema } from "./schemas/profile.schema";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'),
        MongooseModule.forFeature([{ name: 'Profile', schema: profileSchema }])
    ],
    providers: [
        ProfileGateway,
        ProfileService
    ],
})
export class ProfileModule {
}
