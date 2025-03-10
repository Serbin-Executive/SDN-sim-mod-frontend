import BoardWorkContext from "../BoardWorkContext";
import ModelsInfoList from "../ModelsInfoList";
import useWebSocket from "@/hooks/useWebSocket";
import WebSocketConnectByUrl from "../WebSocketConnectByUrl";
import ExcelFileDownloadRequest from "../ExcelFileDownloadRequest";
import useServerMessageHandler from "@/hooks/useServerMessageHandler";
import BoardSettingsContext from "../BoardSettingsContext";
import useBoardSettings from "@/hooks/useBoardSettings";
import BoardControlPanel from "../BoardControlPanel";
import ChartContext from "../ChartsContext";
import useChartsContext from "@/hooks/useChartsContext";
import { LayoutsByUserType, UserStatuses } from "./meta";
import { Fragment, ReactElement, useState } from "react";
import { API } from "@/api";
import { TUserStatus } from "./meta";
import "./style.css";


const Application = (): ReactElement => {
    const [userStatus, setUserStatus] = useState<TUserStatus>(
        UserStatuses.USER
    );
    const [webSocketUrl, setWebSocketUrl] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const [areUrlChecking, setAreUrlChecking] = useState<boolean>(false);
    const [checkingError, setCheckingError] = useState<any>(null);

    // const [settingsConfig, setSettingsConfig] = useState<ISettingsConfig>();

    const {
        boardWorkCommandsConfig,
        modelsActionsStatesList,
        sendedModelsStatesList,
        handleMessageFromServer,
    } = useServerMessageHandler(setUserStatus);

    const { configure, sendMessage } = useWebSocket(
        webSocketUrl,
        handleMessageFromServer
    );

    const { settingsConfig, setSettingsConfig } = useBoardSettings();
    const {isChartsCurrentDotsViewType, chartsDotsCount, setIsChartsCurrentDotsViewType, setChartsDotsCount} = useChartsContext()

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
        <BoardWorkContext.Provider
            value={{
                sendedModelsStatesList: sendedModelsStatesList,
                boardWorkCommandsConfig: boardWorkCommandsConfig,
                modelsActionsStatesList: modelsActionsStatesList,
                sendCommandFunction: sendMessage,
            }}
        >
            <BoardSettingsContext.Provider
                value={{
                    settingsConfig: settingsConfig,
                    setSettingsConfig: setSettingsConfig,
                }}
            >
                <ChartContext.Provider value={
                    {
                        isChartsCurrentDotsViewType: isChartsCurrentDotsViewType,
                        chartsDotsCount: chartsDotsCount,
                        setIsChartsCurrentDotsViewType: setIsChartsCurrentDotsViewType,
                        setChartsDotsCount: setChartsDotsCount,
                    }
                }>
                    <Render asideComponent={<BoardControlPanel />}>
                        <Fragment>
                            <WebSocketConnectByUrl
                                webSocketUrl={webSocketUrl}
                                setWebSocketUrl={setWebSocketUrl}
                                isConnected={isConnected}
                                connectFunction={createConfigure}
                            />
                            <ModelsInfoList />
                            <ExcelFileDownloadRequest />
                        </Fragment>
                    </Render>
                </ChartContext.Provider>
            </BoardSettingsContext.Provider>
        </BoardWorkContext.Provider>
    );
};

export default Application;
