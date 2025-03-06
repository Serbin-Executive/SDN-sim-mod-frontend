import { Dispatch, SetStateAction, useState } from "react";
import { UserStatuses } from "@/components/Application/meta";
import { TModelsActionsStatesList, TServerMessageType, TClientAction, ServerMessageTypes, TSendedModelsStatesList, ISendedModelsStateList } from "./meta";
import { TModelWorkingCommands } from "@/components/ModelsContext/meta";
import { WebsocketMessageParser } from "@/services/ModelWebSocketService";
import { TUserStatus } from "@/components/Application/meta";

const useServerMessageHandler = (setUserStatus: Dispatch<SetStateAction<TUserStatus>>) => {
    const [modelWorkingCommands, setModelWorkingCommands] =
        useState<TModelWorkingCommands>([]);
    const [modelsActionsStatesList, setModelsActionsStatesList] =
        useState<TModelsActionsStatesList>([false, false]);
    const [sendedModelsStatesList, setSendedModelsStatesList] =
        useState<TSendedModelsStatesList>([]);

    const defaultMessageHandler = (messageData: any) => {
        console.info(messageData);
    };

    const updateModelWorkingCommands = (
        messageData: TModelWorkingCommands
    ): void => {
        setModelWorkingCommands(messageData);

        setUserStatus(UserStatuses.HOST);
    };

    // const updateSendedModelsStatesList = (
    //     lastSendedModelsInfoList: ISendedModelsInfoList
    // ): void => {

    //     setSendedModelsStatesList((prevList) => {
    //         let newSendedModelsStatesList: TSendedModelsStatesList = prevList.map(
    //             (sendedModelsInfoList) => ({ ...sendedModelsInfoList })
    //         );

    //         if (!newSendedModelsStatesList.length) {
    //             newSendedModelsStatesList = [{...lastSendedModelsInfoList}]; 

    //             return newSendedModelsStatesList;
    //         }

    //         newSendedModelsStatesList.forEach((sendedModelsInfoList) => {
    //             sendedModelsInfoList.sendedChartsDataList.push(...lastSendedModelsInfoList.sendedChartsDataList);
    //             sendedModelsInfoList.sendedModelsAdditionalInfoList.push(...lastSendedModelsInfoList.sendedModelsAdditionalInfoList);
    //         });

    //         return newSendedModelsStatesList;
    //     });
    // };

    const updateSendedModelsStatesList = (
        sendedLastModelsStateList: ISendedModelsStateList
    ): void => {
        setSendedModelsStatesList((prevList) => {
            let newSendedModelsStatesList: TSendedModelsStatesList = prevList.map(
                (sendedModelsStateList) => ({
                    sendedChartsDataList: [...sendedModelsStateList.sendedChartsDataList],
                    sendedModelsAdditionalInfoList: [...sendedModelsStateList.sendedModelsAdditionalInfoList],
                })
            );

            if (!newSendedModelsStatesList.length) {
                newSendedModelsStatesList = sendedLastModelsStateList.sendedChartsDataList.map((chartsData, index) => {
                    return {
                        sendedChartsDataList: [chartsData],
                        sendedModelsAdditionalInfoList: [sendedLastModelsStateList.sendedModelsAdditionalInfoList[index]],
                    };
                })

                return newSendedModelsStatesList;
            }

            sendedLastModelsStateList.sendedChartsDataList.forEach((chartsData, index) => {
                newSendedModelsStatesList[index].sendedChartsDataList.push(chartsData);
            });

            sendedLastModelsStateList.sendedModelsAdditionalInfoList.forEach((additionalInfo, index) => {
                newSendedModelsStatesList[index].sendedModelsAdditionalInfoList.push(additionalInfo);
            })

            return newSendedModelsStatesList;
        });
    };


    const clearChartsDataLists = (clearMessage: string): void => {
        setSendedModelsStatesList([]);
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
        modelWorkingCommands: modelWorkingCommands,
        modelsActionsStatesList: modelsActionsStatesList,
        sendedModelsStatesList: sendedModelsStatesList,
        handleMessageFromServer: handleMessageFromServer
    }
}

export default useServerMessageHandler;