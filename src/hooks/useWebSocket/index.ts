import { useState } from "react";
import { WS_API_URL } from "./meta";

const useWebSocket = (handler: (data: any) => void) => {
    const [webSocket, setWebSocket] = useState<WebSocket>();

    const sendMessage = (messageData: any) => {
        if (!webSocket) {
            throw new Error();
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
        console.error("ERROR ON WEBSOCKET", event);
    };

    const onClose = (event: CloseEvent) => {
        console.info("WEBSOCKET CLOSED");
    };

    const configure = () => {
        const socket = new WebSocket(WS_API_URL);

        socket.onopen = onOpen;
        socket.onmessage = onMessage;
        socket.onerror = onError;
        socket.onclose = onClose;

        setWebSocket(socket);
    };
    
    if (!webSocket) {
        configure();
    };

    return { webSocket, sendMessage };
};

export default useWebSocket;
