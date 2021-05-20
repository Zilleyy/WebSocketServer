// Node.js WebSocket server script
import http from 'http';
import * as WebSocket from 'websocket';
import {IMessage} from 'websocket';
import {ConnectionType, Session} from "./discord";
import WebSocketServer = WebSocket.server;
import WebSocketRequest = WebSocket.request;
import WebSocketConnection = WebSocket.connection;

export class Index {

    private readonly httpServer: http.Server;

    // The session/connection of the Discord bot.
    private bot: Session;

    public constructor() {

        // Create HTTP server (computer go bleep bloop or something)...
        this.httpServer = http.createServer();

        // Listen to port 3000 on server.
        this.httpServer.listen(3000);

        // Create WebSocketServer using the HTTP server.
        const wss: WebSocketServer = new WebSocketServer({ httpServer: this.httpServer });

        // Listen for client requests.
        wss.on("request", (wsr: WebSocketRequest) => {
            // Accept client request to connect to web socket server.
            const wsc: WebSocketConnection = wsr.accept(null, wsr.origin);

            const session: Session = new Session(wsc, ConnectionType.CLIENT);

            wsc.send({
                mute: {
                    userId: "789339954948866079"
                }
            }.toString());

            // Listen for client connection closure.
            wsc.on("close", () => {
                if(session === this.bot) this.bot = null;
            });

            // Listen for client messages
            wsc.on("message", (data: IMessage) => {
                // Return if given invalid JSON.
                if(!this.isValid(data.utf8Data)) return;

                // Parse the JSON now that it is safe to do so.
                const json: any = JSON.parse(data.utf8Data);

                if("bot" in json) this.bot = session;
                else if(this.bot === session) wss.broadcast(json);
                else if(this.bot && this.bot !== session) this.bot.socket.send(json);

                console.log(json); // TODO remove.
            });

        });
    }

    /**
     * @param str the string to validate.
     * @return if the given string is valid JSON.
     */
    public isValid(str: string): boolean {
        try {
            JSON.parse(str);
            return true;
        } catch(e) {
            return false;
        }
    }

}

const index: Index = new Index(); // Run the program.