import { ReactElement, useState } from "react";
import HostLayout from "@/layouts/Host";
import ModelsContext from "../ModelsContext";
import ModelWorkingCommandsMenu from "../ModelWorkingCommandsMenu";
import ModelsInfoList from "../ModelsInfoList";
import useWebSocket from "@/hooks/useWebSocket";
import WebSocketConnectByUrl from "../WebSocketConnectByUrl";
import DefaultLayout from "@/layouts/Default";
import useServerMessageHandler, { IUseServerMessageHandlerInfo } from "@/hooks/useServerMessageHandler";
import "./style.css";


const Application = (): ReactElement => {
    // const [modelsWorkingCommands, setModelsWorkingCommands] =
    //     useState<TModelWorkingCommands>([]);
    // const [modelsActionsStatesList, setModelsActionsStatesList] =
    //     useState<TModelsActionsStatesList>([false, false]);
    // const [modelsStatesList, setModelsStatesList] =
    //     useState<TModelsCurrentStates>([]);

    const [webSocketUrl, setWebSocketUrl] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);
    // const [isHost, setIsHost] = useState<boolean>(false);

    // const defaultMessageHandler = (messageData: any) => {
    //     console.info(messageData);
    // };

    // const updateModelWorkingCommands = (
    //     messageData: TModelWorkingCommands
    // ): void => {
    //     setModelsWorkingCommands(messageData);

    //     setIsHost(true);
    // };

    // const updateModelsStatesList = (
    //     modelsLastStates: TModelsLastStates
    // ): void => {
    //     setModelsStatesList((prevList) => {
    //         let newModelsStatesList: TModelsCurrentStates = prevList.map(
    //             (modelStatesList) => [...modelStatesList]
    //         );

    //         if (!newModelsStatesList.length) {
    //             newModelsStatesList = modelsLastStates.map((modelLastState) => [
    //                 modelLastState,
    //             ]);

    //             return newModelsStatesList;
    //         }

    //         newModelsStatesList.forEach((modelStatesList, index) => {
    //             modelStatesList.push(modelsLastStates[index]);
    //         });

    //         return newModelsStatesList;
    //     });
    // };

    // const clearModelsStatesList = (clearMessage: string): void => {
    //     setModelsStatesList([]);
    // };

    // const updateModelsActionsStates = (
    //     statesList: TModelsActionsStatesList
    // ): void => {
    //     setModelsActionsStatesList(statesList);
    // };

    // const ActionsInfoList: Record<TServerMessageType, TClientAction> = {
    //     [ServerMessageTypes.MESSAGE]: defaultMessageHandler,
    //     [ServerMessageTypes.MODELS_WORKING_COMMANDS]:
    //         updateModelWorkingCommands,
    //     [ServerMessageTypes.MODELS_CURRENT_STATE]: updateModelsStatesList,
    //     [ServerMessageTypes.CLEAR_CHARTS]: clearModelsStatesList,
    //     [ServerMessageTypes.MODELS_ACTIONS_STATES]: updateModelsActionsStates,
    // };

    // const handleMessageFromServer = (data: string): void => {
    //     try {
    //         const { messageData, messageType } =
    //             WebsocketMessageParser.parseMessage(data);

    //         ActionsInfoList[messageType](messageData);
    //     } catch (error) {
    //         console.log("Failed to parse message from server", error);
    //     }
    // };

    const serverMessageHandlerInfo: IUseServerMessageHandlerInfo = useServerMessageHandler()

    const { configure, sendMessage } = useWebSocket(
        webSocketUrl,
        serverMessageHandlerInfo.handleMessageFromServer,
    );

    const createConfigure = (): void => {
        if (isConnected) {
            return;
        }

            configure();

            setIsConnected(true);
        
    };

    return (
        <ModelsContext.Provider
            value={{
                modelsWorkingCommands: serverMessageHandlerInfo.modelsWorkingCommands,
                setModelsWorkingCommands: serverMessageHandlerInfo.setModelsWorkingCommands,
                modelsActionsStatesList: serverMessageHandlerInfo.modelsActionsStatesList,
                setModelsActionsStatesList: serverMessageHandlerInfo.setModelsActionsStatesList,
                modelsStatesList: serverMessageHandlerInfo.modelsStatesList,
                setModelsStatesList: serverMessageHandlerInfo.setModelsStatesList,
                sendCommandFunction: sendMessage,
            }}
        >
            {serverMessageHandlerInfo.isHost ? (
                <HostLayout asideComponent={<ModelWorkingCommandsMenu />}>
                    <WebSocketConnectByUrl
                        webSocketUrl={webSocketUrl}
                        setWebSocketUrl={setWebSocketUrl}
                        isConnected={isConnected}
                        connectFunction={createConfigure}
                    />
                    <ModelsInfoList />
                </HostLayout>
            ) : (
                <DefaultLayout>
                    <WebSocketConnectByUrl
                        webSocketUrl={webSocketUrl}
                        setWebSocketUrl={setWebSocketUrl}
                        isConnected={isConnected}
                        connectFunction={createConfigure}
                    />
                    <ModelsInfoList />
                </DefaultLayout>
            )}
        </ModelsContext.Provider>
    );
};

export default Application;
