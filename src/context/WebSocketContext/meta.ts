import { Dispatch, SetStateAction } from "react";

export interface IWebSocketContext {
    isConnected: boolean;
    clientStatus: string;
    webSocketUrl: string;
    setWebSocketUrl: Dispatch<SetStateAction<string>>;
    areUrlChecking: boolean;
    checkingError: any;
}