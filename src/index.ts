import * as express    from 'express';
import * as http       from 'http';
import * as WebSocket  from 'ws';
import * as path from "path";
import * as Network    from 'net';
import * as Server     from "http";
import * as Data       from "ws";
import      ArrayList  from "./ArrayList";
import {IncomingMessage, ServerResponse} from "http";

export class Index {

    private static instance: Index;

    private readonly app     : http.RequestListener;
    private readonly server  : http.Server;
    private readonly wss     : WebSocket.Server;

    private readonly sockets : ArrayList<WebSocket> = new ArrayList();

    constructor() {
        Index.instance = this;

        let app        = express();
        let server     = http.createServer(app);
        let wss        = new WebSocket.Server({ server });

        this.app       = app;
        this.server    = server;
        this.wss       = wss;

        this.init();
    }

    public static getInstance(): Index {
        return Index.instance;
    }

    public init(): void {
        /**
         * Registers a listener for new client connections.
         */
        this.server.listen(3000, () => console.log(`Listening on port ${(this.server.address() as Network.AddressInfo).port}`));

        /**
         * The code inside of this method is executed when a client connects to the server.
         */
        this.wss.on("connection", (socket: WebSocket) => {
            console.log(`New connection established: ${socket}`);
            this.sockets.push(socket); // Add the new connection to the list of connected sockets.

            this.wss.on("disconnect", (socket: WebSocket) => this.sockets.remove(socket));
        });
    }

}

new Index();