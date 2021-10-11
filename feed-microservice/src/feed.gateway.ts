import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Observable } from "rxjs";
import { FeedService } from "./feed.service";
import { Post } from "./schemas/post.schema";
import { io } from "socket.io-client";

@WebSocketGateway(8081, { namespace: 'feed' })
export class FeedGateway {

    constructor(private readonly feedService: FeedService) {
    }

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
    async onPostCreation(@MessageBody() postDraft: Post) {
        const newPost = await this.feedService.createPost(postDraft);
        if (newPost) {
            this.server.emit('post:created', newPost);
            const posts = await this.feedService.getPostsByUserId(newPost.userId);
            this.profileSocket.emit(
                'profile:update-metrics',
                { userId: newPost.userId, metric: 'POST_COUNT', count: posts.length }
            );
        }
    }

    @SubscribeMessage('post:update')
    async onPostUpdate(@MessageBody() post: Post) {
        const updatedPost = await this.feedService.updatePost(post);
        this.server.emit('post:updated', updatedPost);
    }

    @SubscribeMessage('post:delete')
    async onPostDelete(@MessageBody() postId: string) {
        const post = await this.feedService.getPost(postId);
        const deleted = await this.feedService.deletePost(postId);
        if (deleted) {
            this.server.emit('post:deleted', postId);
            const posts = await this.feedService.getPostsByUserId(post.userId);
            this.profileSocket.emit(
                'profile:update-metrics',
                { userId: post.userId, metric: 'POST_COUNT', count: posts.length }
            );
        }
    }

}
