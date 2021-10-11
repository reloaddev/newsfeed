import { ProfileService } from './profile.service';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Profile } from "./schemas/profile.schema";
import { ProfileMetric } from "./schemas/profile-metric.model";
import { io } from "socket.io-client";

@WebSocketGateway(8082, { namespace: 'profile' })
export class ProfileGateway {

    constructor(private readonly profileService: ProfileService) {
    }

    @WebSocketServer()
    server: Server;

    feedSocket = io('ws://localhost:8081/feed');

    @SubscribeMessage('profile:get')
    async onGetProfile(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
        let profile;
        try {
            profile = await this.profileService.getProfile(userId);
        } catch (error) {
            console.error(error);
            client.emit('profile:not-found'); // TODO client-side error handling
            return;
        }
        client.emit('profile:loaded', profile);
    }

    @SubscribeMessage('profile:create')
    async onCreateProfile(@MessageBody() profileDraft: Profile, @ConnectedSocket() client: Socket) {
        let profile;
        try {
            profile = await this.profileService.createProfile(profileDraft);
        } catch (error) {
            console.error(error);
            client.emit('profile:not-created'); // TODO client-side error handling
            return;
        }
        this.server.emit('profile:created', profile);
    }

    @SubscribeMessage('profile:update')
    async onUpdateProfile(@MessageBody() profile: Profile, @ConnectedSocket() client: Socket) {
        let updatedProfile;
        try {
            updatedProfile = await this.profileService.updateProfile(profile);
        } catch (error) {
            console.error(error);
            client.emit('profile:not-updated'); // TODO client-side error handling
            return;
        }
        this.server.emit('profile:updated', updatedProfile);
        const pictureDictionary = await this.getPictureDictionary();
        this.server.emit('profile:pictures', pictureDictionary);

    }

    @SubscribeMessage('profile:update-metrics')
    async onUpdateProfileMetrics(
        @MessageBody('userId') userId: string,
        @MessageBody('metric') metric: string,
        @MessageBody('count') count: number,
        @ConnectedSocket() client: Socket
    ) {
        let updatedProfile;
        try {
            updatedProfile = await this.profileService.updateProfileMetrics(
                userId,
                ProfileMetric[metric],
                count
            );
        } catch (error) {
            console.error(error);
            client.emit('profile:not-updated'); // TODO client-side error handling
            return;
        }
        this.server.emit('profile:updated', updatedProfile);
    }

    @SubscribeMessage('profile:get-pictures')
    async onGetProfilePictures(@ConnectedSocket() client: Socket) {
        const pictureDictionary = await this.getPictureDictionary();
        this.server.emit('profile:pictures', pictureDictionary);
    }

    private async getPictureDictionary(): Promise<{ [userId: string]: string }> {
        let profiles = [];
        try {
            profiles = await this.profileService.getAllProfiles();
        } catch (error) {
            console.error(error);
            return;
        }
        const pictureDictionary: { [userId: string]: string } = {};
        profiles.forEach(profile => {
            pictureDictionary[profile.userId] = profile.picture;
        });
        return pictureDictionary;
    }

}
