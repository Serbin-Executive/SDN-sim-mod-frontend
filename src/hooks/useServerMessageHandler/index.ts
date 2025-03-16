import { Dispatch, SetStateAction, useState } from "react";
import { UserStatuses } from "@components/Application/meta";
import {
    TModelsActionsStatesList,
    TServerMessageType,
    TClientAction,
    ServerMessageTypes,
    TSendedModelsStatesList,
    ISendedModelsStateList,
} from "./meta";
import { TBoardWorkCommandsConfig } from "@components/BoardWorkContext/meta";
import { WebsocketMessageParser } from "@services/ModelWebSocketService";
import { TUserStatus } from "@components/Application/meta";

const useServerMessageHandler = (
    setUserStatus: Dispatch<SetStateAction<TUserStatus>>,
    setStatLength: Dispatch<SetStateAction<number>>
) => {
    const [boardWorkCommandsConfig, setBoardWorkCommandsConfig] =
        useState<TBoardWorkCommandsConfig>([]);
    const [modelsActionsStatesList, setModelsActionsStatesList] =
        useState<TModelsActionsStatesList>([false, false]);
    const [sendedModelsStatesList, setSendedModelsStatesList] =
        useState<TSendedModelsStatesList>([]);

    const deleteFirstModelsStates = (): void => {
        setSendedModelsStatesList((prevList) => {
            let newSendedModelsStatesList: TSendedModelsStatesList =
                prevList.map((sendedModelStatesList) => ({
                    sendedChartsDataList: [
                        ...sendedModelStatesList.sendedChartsDataList,
                    ],
                    sendedModelsAdditionalInfoList: [
                        ...sendedModelStatesList.sendedModelsAdditionalInfoList,
                    ],
                }));

            newSendedModelsStatesList.forEach((sendedModelStatesList) => {
                sendedModelStatesList.sendedChartsDataList.shift();
                sendedModelStatesList.sendedModelsAdditionalInfoList.shift();
            });

            return newSendedModelsStatesList;
        });
    };

    const defaultMessageHandler = (messageData: any) => {
        console.info(messageData);
    };

    const updateBoardWorkCommandsConfig = (
        messageData: TBoardWorkCommandsConfig
    ): void => {
        setBoardWorkCommandsConfig(messageData);

        setUserStatus(UserStatuses.HOST);
    };

    const updateSendedModelsStatesList = (
        sendedLastModelsStateList: ISendedModelsStateList
    ): void => {
        setSendedModelsStatesList((prevList) => {
            let newSendedModelsStatesList: TSendedModelsStatesList =
                prevList.map((sendedModelsStateList) => ({
                    sendedChartsDataList: [
                        ...sendedModelsStateList.sendedChartsDataList,
                    ],
                    sendedModelsAdditionalInfoList: [
                        ...sendedModelsStateList.sendedModelsAdditionalInfoList,
                    ],
                }));

            if (!newSendedModelsStatesList.length) {
                newSendedModelsStatesList =
                    sendedLastModelsStateList.sendedChartsDataList.map(
                        (chartsData, index) => {
                            return {
                                sendedChartsDataList: [chartsData],
                                sendedModelsAdditionalInfoList: [
                                    sendedLastModelsStateList
                                        .sendedModelsAdditionalInfoList[index],
                                ],
                            };
                        }
                    );

                return newSendedModelsStatesList;
            }

            sendedLastModelsStateList.sendedChartsDataList.forEach(
                (chartsData, index) => {
                    newSendedModelsStatesList[index].sendedChartsDataList.push(
                        chartsData
                    );
                }
            );

            sendedLastModelsStateList.sendedModelsAdditionalInfoList.forEach(
                (additionalInfo, index) => {
                    newSendedModelsStatesList[
                        index
                    ].sendedModelsAdditionalInfoList.push(additionalInfo);
                }
            );

            return newSendedModelsStatesList;
        });

        setStatLength((statLength) => statLength + 1);
    };

    const clearChartsDataLists = (clearMessage: string): void => {
        setSendedModelsStatesList([]);
        setStatLength(0);
    };

    const updateModelsActionsStates = (
        statesList: TModelsActionsStatesList
    ): void => {
        setModelsActionsStatesList(statesList);
    };

    const ActionsInfoList: Record<TServerMessageType, TClientAction> = {
        [ServerMessageTypes.MESSAGE]: defaultMessageHandler,
        [ServerMessageTypes.MODELS_WORKING_COMMANDS]:
            updateBoardWorkCommandsConfig,
        [ServerMessageTypes.MODELS_STATES]: updateSendedModelsStatesList,
        [ServerMessageTypes.CLEAR_CHARTS]: clearChartsDataLists,
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
        boardWorkCommandsConfig: boardWorkCommandsConfig,
        setBoardWorkCommandsConfig: setBoardWorkCommandsConfig,
        modelsActionsStatesList: modelsActionsStatesList,
        setModelsActionsStatesList: setModelsActionsStatesList,
        sendedModelsStatesList: sendedModelsStatesList,
        setSendedModelsStatesList: setSendedModelsStatesList,
        handleMessageFromServer: handleMessageFromServer,
        deleteFirstModelsStates: deleteFirstModelsStates,
    };
};

export default useServerMessageHandler;
