import { Dispatch, SetStateAction, useState } from "react";
import { UserStatuses } from "@/components/Application/meta";
import { TModelWorkingCommands, TModelsActionsStatesList, TModelsCurrentStates, TModelsLastStates, TServerMessageType, TClientAction, ServerMessageTypes, TUserStatus } from "./meta";
import { WebsocketMessageParser } from "@/services/ModelWebSocketService";

export interface IUseServerMessageHandlerInfo {
    modelsWorkingCommands: TModelWorkingCommands;
    setModelsWorkingCommands: Dispatch<SetStateAction<TModelWorkingCommands>>;
    modelsActionsStatesList: TModelsActionsStatesList;
    setModelsActionsStatesList: Dispatch<SetStateAction<TModelsActionsStatesList>>;
    modelsStatesList: TModelsCurrentStates;
    setModelsStatesList: Dispatch<SetStateAction<TModelsCurrentStates>>;
    userStatus: TUserStatus;
    handleMessageFromServer: (data: string) => void;
}

const useServerMessageHandler = () => {
    const [modelsWorkingCommands, setModelsWorkingCommands] =
        useState<TModelWorkingCommands>([]);
    const [modelsActionsStatesList, setModelsActionsStatesList] =
        useState<TModelsActionsStatesList>([false, false]);
    const [modelsStatesList, setModelsStatesList] =
        useState<TModelsCurrentStates>([]);

    const [userStatus, setUserStatus] = useState<TUserStatus>(UserStatuses.USER);

    const defaultMessageHandler = (messageData: any) => {
        console.info(messageData);
    };

    const updateModelWorkingCommands = (
        messageData: TModelWorkingCommands
    ): void => {
        setModelsWorkingCommands(messageData);

        setUserStatus(UserStatuses.HOST);
    };

    const updateModelsStatesList = (
        modelsLastStates: TModelsLastStates
    ): void => {
        setModelsStatesList((prevList) => {
            let newModelsStatesList: TModelsCurrentStates = prevList.map(
                (modelStatesList) => [...modelStatesList]
            );

            if (!newModelsStatesList.length) {
                newModelsStatesList = modelsLastStates.map((modelLastState) => [
                    modelLastState,
                ]);

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
    };

    const updateModelsActionsStates = (
        statesList: TModelsActionsStatesList
    ): void => {
        setModelsActionsStatesList(statesList);
    };

    const ActionsInfoList: Record<TServerMessageType, TClientAction> = {
        [ServerMessageTypes.MESSAGE]: defaultMessageHandler,
        [ServerMessageTypes.MODELS_WORKING_COMMANDS]:
            updateModelWorkingCommands,
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

    return {
        modelsWorkingCommands: modelsWorkingCommands,
        setModelsWorkingCommands: setModelsWorkingCommands,
        modelsActionsStatesList: modelsActionsStatesList,
        setModelsActionsStatesList: setModelsActionsStatesList,
        modelsStatesList: modelsStatesList,
        setModelsStatesList: setModelsStatesList,
        userStatus: userStatus,
        handleMessageFromServer: handleMessageFromServer
    }
}

export default useServerMessageHandler;