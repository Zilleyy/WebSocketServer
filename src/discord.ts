import * as WebSocket from "websocket";
import WebSocketServer = WebSocket.server;
import WebSocketRequest = WebSocket.request;
import WebSocketConnection = WebSocket.connection;
import { v4 as UUID } from 'uuid';

/**
 * This module encapsulates both global and server scope objects that Discord can interpret.
 */
export module Discord {}

export class Session {

    public readonly socket: WebSocketConnection;
    public readonly uuid: string;

    public constructor(socket: WebSocketConnection) {
        this.socket = socket;
        this.uuid = UUID();
    }

}

export interface ConnectionInformation {

    connectionInformation: {
        uuid: string,
        type: ConnectionType;
    };

}

export enum ConnectionType {

    CLIENT,
    BOT

}