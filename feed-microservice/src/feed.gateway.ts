import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Observable } from "rxjs";
import { FeedService } from "./feed.service";
import { Post } from "./schemas/post.schema";
import { io } from "socket.io-client";

@WebSocketGateway(8081, { namespace: 'feed' })
export class FeedGateway {

    constructor(private readonly feedService: FeedService) {}

    @WebSocketServer()
    server: Server;

    // Websocket client
    profileSocket = io('ws://localhost:8082/profile');

    @SubscribeMessage('feed:initialization')
    onFeedInitialization(): Observable<Post[]> {
        return new Observable<Post[]>(observer => {
            this.feedService.getPosts().then(posts => {
                observer.next(posts)
            });
        })
    }

    @SubscribeMessage('post:create')
    onPostCreation(@MessageBody() postDraft: Post) {
        this.feedService.createPost(postDraft).then(newPost => {
            this.server.emit('post:created', newPost)
        });
    }

    @SubscribeMessage('post:update')
    async onPostUpdate(@MessageBody() post: Post) {
        const updatedPost = await this.feedService.updatePost(post);
        this.server.emit('post:updated', updatedPost);
    }

}
