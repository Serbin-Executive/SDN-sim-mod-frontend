import { Dispatch, SetStateAction } from "react";

export interface IWebSocketContext {
    isConnected: boolean;
    userStatus: string;
    webSocketUrl: string;
}