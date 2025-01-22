import HostLayout from "@/layouts/Host";
import ModelsContext from "../ModelsContext";
import ModelWorkingCommandsMenu from "../ModelWorkingCommandsMenu";
import ModelsInfoList from "../ModelsInfoList";
import useWebSocket from "@/hooks/useWebSocket";
import WebSocketConnectByUrl from "../WebSocketConnectByUrl";
import DefaultLayout from "@/layouts/Default";
import useServerMessageHandler, {
    IUseServerMessageHandlerInfo,
} from "@/hooks/useServerMessageHandler";
import { LayoutsByUserType } from "./meta";
import { Fragment, ReactElement, useCallback, useState } from "react";
import "./style.css";

const Application = (): ReactElement => {
    const [webSocketUrl, setWebSocketUrl] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const serverMessageHandlerInfo: IUseServerMessageHandlerInfo =
        useServerMessageHandler();

    const { configure, sendMessage } = useWebSocket(
        webSocketUrl,
        serverMessageHandlerInfo.handleMessageFromServer
    );

    const createConfigure = (): void => {
        if (isConnected) {
            return;
        }

        configure();

        setIsConnected(true);
    };

    const {
        userStatus,
        modelsWorkingCommands,
        setModelsWorkingCommands,
        modelsActionsStatesList,
        setModelsActionsStatesList,
        modelsStatesList,
        setModelsStatesList
    } = serverMessageHandlerInfo;

    const Render = LayoutsByUserType[userStatus];

    return (
        <ModelsContext.Provider
            value={{
                modelsWorkingCommands: modelsWorkingCommands,
                setModelsWorkingCommands: setModelsWorkingCommands,
                modelsActionsStatesList: modelsActionsStatesList,
                setModelsActionsStatesList: setModelsActionsStatesList,
                modelsStatesList: modelsStatesList,
                setModelsStatesList: setModelsStatesList,
                sendCommandFunction: sendMessage,
            }}
        >
            <Render asideComponent={<ModelWorkingCommandsMenu />}>
                <Fragment>
                    <WebSocketConnectByUrl
                        webSocketUrl={webSocketUrl}
                        setWebSocketUrl={setWebSocketUrl}
                        isConnected={isConnected}
                        connectFunction={createConfigure}
                    />
                    <ModelsInfoList />
                </Fragment>
            </Render>
        </ModelsContext.Provider>
    );
};

export default Application;
