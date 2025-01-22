import { Dispatch, ReactElement, SetStateAction } from "react";
import WebSocketUrlForm from "../WebSocketUrlForm";
import WebSocketConnectButton from "../WebSocketConnectButton";
import "./style.css";

export interface IWebSocketConnectByUrl {
    webSocketUrl: string;
    setWebSocketUrl: Dispatch<SetStateAction<string>>;
    isConnected: boolean;
    connectFunction: () => void;
}

const WebSocketConnectByUrl = ({
    webSocketUrl,
    setWebSocketUrl,
    isConnected,
    connectFunction,
}: IWebSocketConnectByUrl): ReactElement => {
    return (
        <div className="web-socket-model-interact main-container">
            <WebSocketUrlForm url={webSocketUrl} setUrl={setWebSocketUrl} />
            <WebSocketConnectButton
                isConnected={isConnected}
                connectFunction={connectFunction}
            />
        </div>
    );
};

export default WebSocketConnectByUrl;
