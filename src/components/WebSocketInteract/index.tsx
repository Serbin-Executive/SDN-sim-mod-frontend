import { useState, ReactElement, useContext, useEffect } from "react";
import {
    ServerMessageTypes,
    TClientAction,
    TServerMessageType,
    TModelsCurrentStates,
    TModelWorkingCommands,
    TModelsLastStates,
    TModelsActionsStatesList,
} from "./meta";
import useWebSocket from "../../hooks/useWebSocket";
import { WebsocketMessageParser } from "../../services/ModelWebSocketService";
import ModelsContext from "../ModelsContext";
import "./style.css";
import WebSocketConnectButton from "../WebSocketConnectButton";
import WebSocketUrlForm from "../WebSocketUrlForm";

const WebSocketModelInteract = (): ReactElement => {
    const {setModelsWorkingCommands, setModelsActionsStatesList, setModelsStatesList } = useContext(ModelsContext);

    const [webSocketUrl, setWebSocketUrl] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);
    
    const defaultMessageHandler = (messageData: any) => {
        console.info(messageData);
    };

    const updateModelWorkingCommands = (
        messageData: TModelWorkingCommands
    ): void => {
        setModelsWorkingCommands(messageData);
    };

    const updateModelsStatesList = (
        modelsLastStates: TModelsLastStates
    ): void => {
        setModelsStatesList((prevList) => {
            let newModelsStatesList: TModelsCurrentStates = prevList.map((modelStatesList) => [...modelStatesList]);

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

    const clearModelsStatesList = (clearMessage: string): void => {
        setModelsStatesList([]);
    }

    const updateModelsActionsStates = (statesList: TModelsActionsStatesList): void => {
        setModelsActionsStatesList(statesList);
    }

    const ActionsInfoList: Record<TServerMessageType, TClientAction> = {
        [ServerMessageTypes.MESSAGE]: defaultMessageHandler,
        [ServerMessageTypes.MODELS_WORKING_COMMANDS]: updateModelWorkingCommands,
        [ServerMessageTypes.MODELS_CURRENT_STATE]: updateModelsStatesList,
        [ServerMessageTypes.CLEAR_CHARTS]: clearModelsStatesList,
        [ServerMessageTypes.MODELS_ACTIONS_STATES]: updateModelsActionsStates,
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
        
    const { configure, sendMessage } = useWebSocket(webSocketUrl, handleMessageFromServer);
        
    const createConfigure = (): void => {
        if (isConnected) {
            return;
        }

        configure();

        setIsConnected(true);
    };

    

    return (
        <div className="web-socket-model-interact main-container">
            <WebSocketUrlForm url={webSocketUrl} setUrl={setWebSocketUrl} />
            <WebSocketConnectButton isConnected={isConnected} connectFunction={createConfigure} />
        </div>
    );
};

export default WebSocketModelInteract;
