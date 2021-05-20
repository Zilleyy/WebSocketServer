import * as WebSocket from 'websocket';
import WebSocketServer = WebSocket.server;
import WebSocketRequest = WebSocket.request;
import WebSocketConnection = WebSocket.connection;
import { Session } from "./discord";
import ArrayList from "./arraylist";

export class SessionManager {

    private static readonly sessions: ArrayList<Session> = new ArrayList<Session>();
    private static bot: Session;

    public static add(session: Session): void {
        SessionManager.sessions.push(session);
    }

    public static remove(session: Session): void;
    public static remove(wsc: WebSocketConnection): void;

    public static remove(session: Session | WebSocketConnection): void {
        if(session instanceof Session) SessionManager.sessions.push(session);
        else if(session instanceof WebSocketConnection) SessionManager.sessions.push(new Session(session));
    }

    public static setBot(session: Session): void {
        this.bot = session;
    }

    public static isBot(session: Session): boolean {
        return this.bot === session;
    }

    /**
     * Finds a Session using a given UUID.
     * @param uuid the UUID to search for.
     * @return the Session if found.
     */
    public static get(uuid: string): Session {
        for(const session of this.sessions) {
            if(session.uuid === uuid) return session;
        }
    }

} //