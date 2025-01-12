import {
    IServerMessage,
    ServerMessageTypes,
} from "../../components/WebSocketModelInteract/meta";

export class WebsocketMessageParser {
    public static parseMessage(data: any) {
        const messageData: IServerMessage = JSON.parse(data);
        const messageType: string = this.getMessageType(messageData);

        // if(messageType === ServerMessageTypes.DEFAULT) {
        //     return {messageData, messageType}
        // }

        return { messageData: messageData.message, messageType}  
    }

    private static getMessageType(
        messageData: IServerMessage
    ): ServerMessageTypes {
        const currentServerMessageType =
            messageData?.messageType as ServerMessageTypes;

        return (
            currentServerMessageType ??
            ServerMessageTypes.DEFAULT
        );
    }
}