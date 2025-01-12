import { useState, ReactElement } from "react";
import {
    ServerMessageTypes,
    TClientAction,
    TServerMessageType,
    TModelsCurrentStates,
    TModelWorkingCommands,
    TModelsLastStates,
} from "./meta";
import useWebSocket from "../../hooks/useWebSocket";
import { WebsocketMessageParser } from "../../services/ModelWebSocketService";
import ModelWorkingCommandsMenu from "../ModelWorkingCommandsMenu";
import ChartsList from "../ChartsList";
import "./style.css";

const WebSocketModelInteract = (): ReactElement => {
    const [modelWorkingCommands, setModelWorkingCommands] =
        useState<TModelWorkingCommands>([]);
    const [modelsStatesList, setModelsStatesList] =
        useState<TModelsCurrentStates>([]);

    const defaultMessageHandler = (messageData: any) => {
        console.log("message", messageData);
    };

    const updateModelWorkingCommands = (
        messageData: TModelWorkingCommands
    ): void => {
        setModelWorkingCommands(messageData);
    };

    const updateModelsStatesList = (
        modelsLastStates: TModelsLastStates
    ): void => {
        setModelsStatesList((prevList) => {
            let newModelsStatesList = prevList.map((modelStatesList) => [...modelStatesList]);

            if (!newModelsStatesList.length) {
                newModelsStatesList = modelsLastStates.map((modelLastState) => [modelLastState]);

                return newModelsStatesList;
            }

            newModelsStatesList.forEach((modelStatesList, index) => {
                modelStatesList.push(modelsLastStates[index]);
            });

            return newModelsStatesList;
        });

    };

    const ActionsInfoList: Record<TServerMessageType, TClientAction> = {
        [ServerMessageTypes.DEFAULT]: defaultMessageHandler,
        [ServerMessageTypes.MODEL_COMMANDS]: updateModelWorkingCommands,
        [ServerMessageTypes.MODEL_STATE]: updateModelsStatesList,
    };

    const handleMessageFromServer = (data: string): void => {
        try {
            const { messageData, messageType } =
                WebsocketMessageParser.parseMessage(data);

            ActionsInfoList[messageType](messageData);
        } catch (error) {
            console.log("Failed to parse message from server", error);
        }
    };

    const { sendMessage } = useWebSocket(handleMessageFromServer);

    return (
        <div className="web-socket-model-interact main-container">
            <ModelWorkingCommandsMenu
                data={modelWorkingCommands}
                completeCommandFunction={sendMessage}
            />

            <ChartsList data={modelsStatesList} />
        </div>
    );
};

export default WebSocketModelInteract;
