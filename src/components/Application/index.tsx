import ModelsContext from "../ModelsContext";
import ModelWorkingCommandsMenu from "../ModelWorkingCommandsMenu";
import ModelsInfoList from "../ModelsInfoList";
import useWebSocket from "@/hooks/useWebSocket";
import WebSocketConnectByUrl from "../WebSocketConnectByUrl";
import { LayoutsByUserType, UserStatuses } from "./meta";
import { Fragment, ReactElement, useState } from "react";
import { API } from "@/api";
import useServerMessageHandler from "@/hooks/useServerMessageHandler";
import { TUserStatus } from "./meta";
import "./style.css";

const Application = (): ReactElement => {
    const [userStatus, setUserStatus] = useState<TUserStatus>(UserStatuses.USER);
    const [webSocketUrl, setWebSocketUrl] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const [areUrlChecking, setAreUrlChecking] = useState<boolean>(false);
    const [checkingError, setCheckingError] = useState<any>(null);

    const {
        modelWorkingCommands,
        modelsActionsStatesList,
        modelsStatesList,
        handleMessageFromServer,
    } = useServerMessageHandler(setUserStatus);

    const { configure, sendMessage } = useWebSocket(
        webSocketUrl,
        handleMessageFromServer,
    );

    const createConfigure = async () => {
        if (webSocketUrl === "") {
            console.info("CANNOT CONNECT WITH EMPTY URL");

            return;
        }

        try {
            setCheckingError(null);
            setAreUrlChecking(true);

            const connectionAccess: boolean =
                await API.getAccessWsConnectionByUrl(webSocketUrl);

            if (!connectionAccess) {
                console.info("FAIL CONNECTION URL");

                return;
            }

            configure();

            setIsConnected(true);
        } catch (error) {
            console.info("FAIL HTTP REQUEST");

            setCheckingError(error);
        } finally {
            setAreUrlChecking(false);
        }
    };

    if (areUrlChecking) {
        return <h2>CHECKING URL...</h2>;
    }

    if (checkingError) {
        return <h2>Unable to check url {checkingError?.message}</h2>;
    }

    const Render = LayoutsByUserType[userStatus];

    return (
        <ModelsContext.Provider
            value={{
                modelsStatesList: modelsStatesList,
                modelWorkingCommandsList: modelWorkingCommands,
                modelsActionsStatesList: modelsActionsStatesList,
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
