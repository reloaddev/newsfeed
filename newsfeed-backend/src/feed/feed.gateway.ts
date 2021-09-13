import {
    OnGatewayConnection,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from "@nestjs/websockets";
import {Server} from 'ws';

@WebSocketGateway(8080)
export class FeedGateway implements OnGatewayInit, OnGatewayConnection {


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

    @SubscribeMessage('newPost')
    onNewPostEvent(client: any, post: any): WsResponse<string> {
        this.posts.push(post);
        return { event: 'newPostUploaded', data: 'Post was uploaded.' };
    }

    @SubscribeMessage('posts')
    queryPosts() {
        return 'Hello World';
    }


}