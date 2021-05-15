"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const ArrayList_1 = require("./ArrayList");
class Index {
    constructor() {
        this.sockets = new ArrayList_1.default();
        Index.instance = this;
        let app = express();
        let server = http.createServer(app);
        let wss = new WebSocket.Server({ server });
        this.app = app;
        this.server = server;
        this.wss = wss;
        this.init();
    }
    static getInstance() {
        return Index.instance;
    }
    init() {
        /**
         * Registers a listener for new client connections.
         */
        this.server.listen(3000, () => console.log(`Listening on port ${this.server.address().port}`));
        /**
         * The code inside of this method is executed when a client connects to the server.
         */
        this.wss.on("connection", (socket) => {
            console.log(`New connection established: ${socket}`);
            this.sockets.push(socket); // Add the new connection to the list of connected sockets.
            this.wss.on("disconnect", (socket) => this.sockets.remove(socket));
            //this.wss.on("message", ());
        });
    }
}
exports.Index = Index;
new Index();
