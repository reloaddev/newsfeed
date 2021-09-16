import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from "@nestjs/websockets";
import {Server} from "socket.io";
import {from, Observable, of} from "rxjs";
import {FeedService} from "./feed.service";
import {Post} from "./schemas/post.schema";
import {PostDto} from "./dto/post.dto";

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
            this.feedService.findAll().then(posts => observer.next(posts));
        })
    }

    @SubscribeMessage('feed:new-post')
    onPostCreation(@MessageBody() postDto: PostDto): string {
        console.log(postDto);
        this.feedService.create(postDto).then(post => console.log(post));
        return 'PostModel was uploaded.';
    }



}