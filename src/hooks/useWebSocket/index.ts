import { useState } from "react";
import { WS_PROTOCOL } from "./meta";


const useWebSocket = (webSocketUrl: string, handler: (data: any) => void) => {
    const [webSocket, setWebSocket] = useState<WebSocket>();

    const sendMessage = (messageData: any) => {
        if (!webSocket) {
            console.log("Cannot send message to server, web socket in not connected");

            return;
        }

        webSocket.send(messageData);
    };

    const onOpen = (event: Event) => {
        console.info("WEBSOCKET CREATED");
    };

    const onMessage = (event: MessageEvent) => {
        handler(event.data);
    };

    const onError = (event: Event) => {
        console.info("ERROR ON WEBSOCKET", event);
    };

    const onClose = (event: CloseEvent) => {
        console.info("WEBSOCKET CLOSED");
    };

    const configure = () => {
        const socket = new WebSocket(`${WS_PROTOCOL}${webSocketUrl}`);

        socket.onopen = onOpen;
        socket.onmessage = onMessage;
        socket.onerror = onError;
        socket.onclose = onClose;

        setWebSocket(socket);
    };

    return { configure, sendMessage };
};

export default useWebSocket;
