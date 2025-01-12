import { useState, ReactElement } from "react";
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
import ModelWorkingCommandsMenu from "../ModelWorkingCommandsMenu";
import ChartsList from "../ChartsList";
import "./style.css";

const WebSocketModelInteract = (): ReactElement => {
    const [modelWorkingCommands, setModelWorkingCommands] =
        useState<TModelWorkingCommands>([]);
    const [modelsStatesList, setModelsStatesList] =
        useState<TModelsCurrentStates>([]);
    const [modelsActionsStatesList, setModelsActionsStatesList] = useState<TModelsActionsStatesList>([]);

    const defaultMessageHandler = (messageData: any) => {
        console.info(messageData);
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

    const { sendMessage } = useWebSocket(handleMessageFromServer);

    return (
        <div className="web-socket-model-interact main-container">
            <ModelWorkingCommandsMenu
                actionsStatesList = {modelsActionsStatesList}
                data={modelWorkingCommands}
                completeCommandFunction={sendMessage}
            />

            <ChartsList data={modelsStatesList} />
        </div>
    );
};

export default WebSocketModelInteract;
