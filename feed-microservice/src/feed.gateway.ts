import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
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
    async onCreatePost(@MessageBody() postDraft: Post, @ConnectedSocket() client: Socket) {
        let newPost;
        try {
            newPost = await this.feedService.createPost(postDraft);
        } catch (error) {
            console.error(error);
            client.emit('post:not-created'); // TODO client-side error handling
            return;
        }
        this.server.emit('post:created', newPost);
        let posts;
        try {
            posts = await this.feedService.getPostsByUserId(newPost.userId);
        } catch (error) {
            console.error(error);
            client.emit('profile:metrics-not-updated'); // TODO client-side error handling
            return;
        }
        this.profileSocket.emit(
            'profile:update-metrics',
            { userId: newPost.userId, metric: 'POST_COUNT', count: posts.length }
        );
    }

    @SubscribeMessage('post:update')
    async onUpdatePost(
        @MessageBody('userId')  userId: string,
        @MessageBody('post') post: Post,
        @ConnectedSocket() client: Socket
    ) {
        let updatedPost;
        try {
            updatedPost = await this.feedService.updatePost(post);
        } catch (error) {
            console.error(error);
            client.emit('post:not-updated'); // TODO client-side error handling
            return;
        }
        this.server.emit('post:updated', updatedPost);
        const comments = await this.feedService.getCommentsByUserId(userId);
        this.profileSocket.emit(
            'profile:update-metrics',
            { userId: userId, metric: 'COMMENT_COUNT', count: comments.length }
        );
    }

    @SubscribeMessage('post:delete')
    async onDeletePost(
        @MessageBody('userId') userId: string,
        @MessageBody('postId') postId: string,
        @ConnectedSocket() client: Socket) {
        let post;
        try {
            post = await this.feedService.getPost(postId);
        } catch (error) {
            console.error(error);
            client.emit('post:not-found'); // TODO client-side error handling
            return;
        }
        try {
            await this.feedService.deletePost(postId);
        } catch (error) {
            console.error(error);
            client.emit('post:not-deleted'); // TODO client-side error handling
            return;
        }
        this.server.emit('post:deleted', postId);
        const posts = await this.feedService.getPostsByUserId(post.userId);
        this.profileSocket.emit(
            'profile:update-metrics',
            { userId: post.userId, metric: 'POST_COUNT', count: posts.length }
        );
        const comments = await this.feedService.getCommentsByUserId(userId);
        this.profileSocket.emit(
            'profile:update-metrics',
            { userId: userId, metric: 'COMMENT_COUNT', count: comments.length }
        );
    }

}
