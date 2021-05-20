"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
// Node.js WebSocket server script
const http_1 = __importDefault(require("http"));
const WebSocket = __importStar(require("websocket"));
const discord_1 = require("./discord");
var WebSocketServer = WebSocket.server;
class Index {
    constructor() {
        // Create HTTP server (computer go bleep bloop or something)...
        this.httpServer = http_1.default.createServer();
        // Listen to port 3000 on server.
        this.httpServer.listen(3000);
        // Create WebSocketServer using the HTTP server.
        const wss = new WebSocketServer({ httpServer: this.httpServer });
        // Listen for client requests.
        wss.on("request", (wsr) => {
            // Accept client request to connect to web socket server.
            const wsc = wsr.accept(null, wsr.origin);
            const session = new discord_1.Session(wsc, discord_1.ConnectionType.CLIENT);
            wsc.send({
                mute: {
                    userId: "789339954948866079"
                }
            }.toString());
            // Listen for client connection closure.
            wsc.on("close", () => {
                if (session === this.bot)
                    this.bot = null;
            });
            // Listen for client messages
            wsc.on("message", (data) => {
                // Return if given invalid JSON.
                if (!this.isValid(data.utf8Data))
                    return;
                // Parse the JSON now that it is safe to do so.
                const json = JSON.parse(data.utf8Data);
                if ("bot" in json)
                    this.bot = session;
                else if (this.bot === session)
                    wss.broadcast(json);
                else if (this.bot && this.bot !== session)
                    this.bot.socket.send(json);
                console.log(json); // TODO remove.
            });
        });
    }
    /**
     * @param str the string to validate.
     * @return if the given string is valid JSON.
     */
    isValid(str) {
        try {
            JSON.parse(str);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.Index = Index;
const index = new Index(); // Run the program.
//# sourceMappingURL=index.js.map