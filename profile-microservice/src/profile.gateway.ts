import { ProfileService } from './profile.service';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Profile } from "./schemas/profile.schema";
import { ProfileMetric } from "./schemas/profile-metric.model";

@WebSocketGateway(8082, { namespace: 'profile' })
export class ProfileGateway {

    constructor(private readonly profileService: ProfileService) {
    }

    @WebSocketServer()
    server: Server;

    // TODO simplify to async...await
    @SubscribeMessage('profile:get')
    onProfileGet(@MessageBody() userId: string,
                 @ConnectedSocket() client: Socket) {
        this.profileService.getProfile(userId).then(profile => {
            if (profile) {
                client.emit('profile:loaded', profile);
            } else {
                client.emit('profile:not-found');
            }
        })
    }

    @SubscribeMessage('profile:create')
    async onProfileCreate(@MessageBody() profileDraft: Profile) {
        const profile = await this.profileService.createProfile(profileDraft);
        this.server.emit('profile:created', profile);
    }

    @SubscribeMessage('profile:update')
    async onProfileUpdate(@MessageBody() profile: Profile) {
        const updatedProfile = await this.profileService.updateProfile(profile);
        this.server.emit('profile:updated', updatedProfile);
    }

    @SubscribeMessage('profile:update-metrics')
    async onProfileMetricUpdate(
        @MessageBody('userId') userId: string,
        @MessageBody('metric') metric: string,
        @MessageBody('count') count: number)
    {
        const updatedProfile = await this.profileService.updateProfileMetrics(
            userId,
            ProfileMetric[metric],
            count
        );
        this.server.emit('profile:updated', updatedProfile);
    }

    @SubscribeMessage('profile:get-pictures')
    async onGetProfilePictures() {
        const profiles = await this.profileService.getAllProfiles();
        const pictureDictionary: { [userId: string]: string } = {};
        profiles.forEach(profile => {
            pictureDictionary[profile.userId] = profile.picture;
        });
        this.server.emit('profile:pictures', pictureDictionary);
    }


}
