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
import {FeedService} from "./schemas/feed.service";

@WebSocketGateway(8081, { namespace: 'feed' })
export class FeedGateway implements OnGatewayInit, OnGatewayConnection {

    constructor(private feedService: FeedService) {}

    private posts = [
        'Then on it there are placed two divs: "bottom" and right which have height and width of your wish. I set up background red to show in more understandable way how it works. bla bla bla.',
        'Then on it there are placed two divs: bottom and right which have height and width of your wish. I set up background red to show in more understandable way how it works.',
        'Ob du jetzt hier bist oder in China fällt ein Sack Reis um',
        'Morgenstund hat Gold im Mund',
        'Der frühe Vogel fängt den Wurm',
        'Post 5 ist ein nicer Post',
        'Post 6 ist kein nicer Post'
    ]

    @WebSocketServer()
    server: Server;

    afterInit(server: any) {
    }

    handleConnection(client: any, ...args: any[]) {
        client.send(JSON.stringify(this.posts));
    }

    @SubscribeMessage('feed:initialization')
    onFeedInitialization(): string[] {
        this.feedService.findAll().then(result => console.log(result));
        return this.posts;
    }

    @SubscribeMessage('feed:new-post')
    onPostCreation(@MessageBody() post: string): string {
        this.posts.push(post);
        return `Post "${post}" was uploaded.`;
    }



}