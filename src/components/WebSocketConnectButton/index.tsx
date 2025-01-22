import { ReactElement } from "react";
import "./style.css";

export interface IWebSocketConnectButtonProps {
    isConnected: boolean;
    connectFunction: () => void;
}

const WebSocketConnectButton = ({isConnected, connectFunction}: IWebSocketConnectButtonProps) :ReactElement => {
    const buttonClass = isConnected ? "web-socket-connect-button-inactive" : "web-socket-connect-button-active"
    
    return(
        <div className={buttonClass} onClick={connectFunction}>
            connect
        </div>
    )
}

export default WebSocketConnectButton;