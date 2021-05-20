import * as WebSocket from "websocket";
import WebSocketConnection = WebSocket.connection;

/**
 * This module encapsulates both global and server scope objects that Discord can interpret.
 */
export module Discord {}

export default interface Mute {

    mute: {
        userId    : string;
        duration ?: number;
    };

}

export class Session {

    public readonly socket: WebSocketConnection;
    // public readonly connectionInformation: ConnectionInformation;
    public connectionType: ConnectionType;

    public constructor(socket: WebSocketConnection, connectionType: ConnectionType) {
        this.socket = socket;
        this.connectionType = connectionType;
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