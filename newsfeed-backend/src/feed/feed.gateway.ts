import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Observable } from "rxjs";
import { FeedService } from "./feed.service";
import { Post } from "./schemas/post.schema";

@WebSocketGateway(8081, { namespace: 'feed' })
export class FeedGateway implements OnGatewayInit {

    constructor(private feedService: FeedService) {}

    @WebSocketServer()
    server: Server;

    afterInit(server: any) {
    }

    @SubscribeMessage('feed:initialization')
    onFeedInitialization(): Observable<Post[]> {
        return new Observable<Post[]>(observer => {
            this.feedService.getPosts().then(posts => {
                console.log(posts);
                observer.next(posts)
            });
        })
    }

    @SubscribeMessage('feed:new-post')
    onPostCreation(@MessageBody() postDraft: Post) {
        this.feedService.createPost(postDraft).then(newPost => {
            this.server.emit('feed:new-post', newPost)
        });
    }

    @SubscribeMessage('feed:update-post')
    async onPostUpdate(@MessageBody() post: Post) {
        const updatedPost = await this.feedService.updatePost(post);
        this.server.emit('feed:update-post', updatedPost);
    }

}
