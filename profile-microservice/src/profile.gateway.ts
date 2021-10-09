import { ProfileService } from './profile.service';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Profile } from "./schemas/profile.schema";

@WebSocketGateway(8082, { namespace: 'profile' })
export class ProfileGateway {

  constructor(private readonly profileService: ProfileService) {}

  @WebSocketServer()
  server: Server;

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
  onProfileCreate(@MessageBody() profileDraft: Profile) {
    this.profileService.createProfile(profileDraft).then(profile => {
      this.server.emit('profile:created', profile);
    })
  }

  @SubscribeMessage('profile:update')
  onProfileUpdate(@MessageBody() profile: Profile) {
    this.profileService.updateProfile(profile).then(profile => {
      this.server.emit('profile:updated', profile);
    });
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
